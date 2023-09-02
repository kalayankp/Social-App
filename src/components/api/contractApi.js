
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../utils/supabase"




async function getContract(title, clauses, setContractFormOpen) {

  const user = await AsyncStorage.getItem('user_info');
  const { email, id } = JSON.parse(user);
  // console.log(id)
  try {
    const { data, error } = await supabase.from('Contract').insert([
      {
        title: title,
        owner_id: id,
      },
    ])

    const { data: getbytitle, error: titlerror } = await supabase
      .from('Contract')
      .select('*')
      .eq('title', title)
      .single();

    if (error) {
      // console.log('Error creating contract:', error);
      setContractFormOpen(false);
      alert("Error creating contract 30");
    } else {
      console.log('Contract created successfully:', data);

    }
    // console.log('getbytitle', getbytitle);
    // console.log('titlerror', titlerror);

    for (const clause of clauses) {
      const { data, error } = await supabase.from('Clauses').insert([
        {
          contract_id: getbytitle.id,
          clause: clause,
        },
      ])
      if (error) {
        // console.log('Error creating clause:', error);
        setContractFormOpen(false);
        alert("Error creating clause 48");
      } else {
        console.log('Clause created successfully:', data);
      }
    }
    const { data: refreshedContracts, error: refresheror } = await supabase
      .from('Contract')
      .select('*')
      .eq('owner_id', id)
      .order('created_at', { ascending: false });
    if (refreshedContracts && refreshedContracts.length > 0) {
      const mappedContracts = refreshedContracts.map(contract => ({
        value: contract.id,
        label: contract.title,
      }));
      mappedContracts.push({ value: 'createNew', label: 'Create New' });
      // setOptions(mappedContracts);
    } else {
      // console.log(refresheror);
      console.log('No contracts found for this owner_id');
    }
    setContractFormOpen(false);
  } catch (error) {
    console.error('Error creating contract 71:', error);
    setContractFormOpen(false);
    alert("Error creating contract 73");
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