
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../utils/supabase"


async function getContract(title, clauses = [], setContractFormOpen) {

  const user = await AsyncStorage.getItem('user_info');
  const { email, id } = JSON.parse(user);
  // console.log(id, 'id');

  try {
    const { data: contractData, error: contractError } = await supabase.from('Contract').insert([
      {
        title: title,
        owner_id: id,
      },
    ]);
    if (contractError) {
      console.log('Error Creating Contract:', contractError)
      alert('Error creating contract')
      setContractFormOpen(false);
      return;

    }else {
      console.log('Contract created Successfully:', contractData)
    }



    const { data: getbytitle, error: titlerror } = await supabase
      .from('Contract')
      .select('*')
      .eq('title', title)
      .single();

    if (titlerror) {
      console.log('Error creating contract:', titlerror);
      setContractFormOpen(false);
      alert('Error creating contract');
      return;
    }

    let promiseArr = [];
    for (let i = 0; i < clauses.length; i++) {
      promiseArr.push(new Promise((resolve, reject) => {
        resolve(supabase.from('Clauses').insert([
            {
              contract_id: getbytitle.id,
              clause: clauses[i],
            },
          ]))
      }));
    }

    const clauseResults = await Promise.all(promiseArr);
    let hasError = false;
    clauseResults.map((clasuse) => {
      console.log(clasuse, 'clasuse');
      if(clasuse.status != 201) hasError = true;
    })
    if (hasError) {
      console.log('Error creating clauses');
      alert('Error creating clauses');
      return;
    }

    const { data: refreshedContracts, error: refresheror } = await supabase
      .from('Contract')
      .select('*')
      .eq('owner_id', id)
      .order('created_at', { ascending: false });
    if (refreshedContracts && refreshedContracts.length > 0) {
      const mappedContracts = refreshedContracts.map((contract) => ({
        value: contract.id,
        label: contract.title,
      }));
      mappedContracts.push({ value: 'createNew', label: 'Create New' });
      // setOptions(mappedContracts);
    } else {
      console.log(refresheror);
      console.log('No contracts found for this owner_id');
    }
    // setContractFormOpen(false);
  } catch (error) {
    console.error('Error creating contract:', error);
    // setContractFormOpen(false);
    alert('Error creating contract');
  }

};

//addcontract api call
const addContract = async () => {
  const user = await AsyncStorage.getItem('user_info');
  const { id } = JSON.parse(user);

  let { data: contractData, error } = await supabase
    .from('Contract')
    .select('*')
    .eq('owner_id', id)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching contract:', error);
    return;
  }
  if (contractData && contractData.length > 0) {
    const mappedContracts = contractData.map(contract => ({
      value: contract.id,
      label: contract.title,
    }));
    mappedContracts.push({ value: 'createNew', label: 'Create New' });
    return mappedContracts;
  }
  return null;
}

export { getContract, addContract }