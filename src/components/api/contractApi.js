import { supabase } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchContractsApi = async () => {
    try {
      const user = await AsyncStorage.getItem('user_info');
      const { id } = JSON.parse(user);
  
      const { data: contractData, error } = await supabase
        .from('Contract')
        .select('*')
        .eq('owner_id', id)
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error('Error fetching contract from contractApi 16:', error);
        return { error };
      }
  
      if (contractData && contractData.length > 0) {
        const mappedContracts = contractData.map((contract) => ({
          value: contract.id,
          label: contract.title,
        }));
  
        mappedContracts.push({ value: 'createNew', label: 'Create New' });
  
        return { data: mappedContracts };
      } else {
        return {
          data: [{ value: 'createNew', label: 'Create New' }],
          message: 'No contracts found for this owner_id',
        };
      }
    } catch (error) {
      console.error('Error fetching contract', error);
      return { error };
    }
  };


export const getContractsApi = async (clauses, title) => {
  

    try {
        const user = await AsyncStorage.getItem('user_info');
        const { id } = JSON.parse(user);
       

        const { data: contractData, error: contractError } = await supabase.from('Contract').insert([
            {
                title: title,
                owner_id: id,
            },
        ])
            .select()
            .single()



        if (contractError) {
            return { success: false, error: contractError };
           
        }



        const clauseInsertPromises = clauses.map((async (clause) => {
            const { data: clauseData, error: clauseError } = await supabase.from('Clauses').insert([
                {
                    contract_id: contractData.id,
                    clause: clause,
                },
            ])
                .select()
                .single()




            if (clauseError) {
                console.log('Error creating clause :', clauseError);

                return { success: true, data: clauseError };
            } else {
                console.log('Clause created successfully', clauseData);
                return { success: true, data: clauseData };
            }

        }))

        const clauseResults = await Promise.all(clauseInsertPromises)

        //check if any clauses failed to insert

        if (clauseResults.some((clauseResults) => clauseResults === null)) {
            return { success: false, error: 'Some clauses failed to insert' };
        }
        return { success: true, data: contractData };



    } catch (error) {

        console.error('Error creating contract 148:', error);

        return { success: false, error };

    }
}
