import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../utils/supabase"
import { CREATE_CONTRACT_FAILURE, CREATE_CONTRACT_SUCCESS, FETCH_CONTRACTS_FAILURE, FETCH_CONTRACTS_SUCCESS, } from '../actionTypes/contractActiontypes';


export const fetchContracts = () => async (dispatch) => {
    try {

        const user = await AsyncStorage.getItem('user_info');
        const { id } = JSON.parse(user);

        let { data: contractData, error } = await supabase
            .from('Contract')
            .select('*')
            .eq('owner_id', id)
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching contract from contractAction :', error);
            dispatch({ type: FETCH_CONTRACTS_FAILURE, payload: error })
            return;
        }
        console.log(contractData, "contractdataa")
        if (contractData && contractData.length > 0) {
            const mappedContracts = contractData.map(contract => ({
                value: contract.id,
                label: contract.title,
            }));

            mappedContracts.push({ value: 'createNew', label: 'Create New' });

            dispatch({ type: FETCH_CONTRACTS_SUCCESS, payload: mappedContracts })
        }


        else {
            dispatch({ type: FETCH_CONTRACTS_SUCCESS, payload: [{ value: 'createNew', label: 'Create New' }] })
            alert('No contracts found for this owner_id')

        }
    } catch (error) {
        dispatch({ type: FETCH_CONTRACTS_FAILURE, payload: error })
        console.error('Error fetching contract', error);
    }
}

export const getContract = (setContractFormOpen, clauses, title) => async (dispatch) => {
    const user = await AsyncStorage.getItem('user_info');
    const { email, id } = JSON.parse(user);

    try {
        const { data: contractData, error: contractError } = await supabase.from('Contract').insert([
            {
                title: title,
                owner_id: id,
            },
        ])
            .select()
            .single()



        if (contractData) {
            dispatch({ type: CREATE_CONTRACT_SUCCESS, payload: contractData })
        }



        const clauseInsertPromises = clauses.map(( async (clause) => {
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
                setContractFormOpen(false);
                alert("Error creating clause ");
                return null
            } else {
                console.log('Clause created successfully', clauseData);
                return clauseData
            }

        }))

        const clauseResults = await Promise.all(clauseInsertPromises)

        //check if any clauses failed to insert

        if(clauseResults.some((clauseResults) => clauseResults === null)) {
            return 
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
            alert("contract created successfully")
            dispatch({ type: FETCH_CONTRACTS_SUCCESS, payload: mappedContracts })
           

        } else {
            console.log('No contracts found for this owner_id', refresheror);

            dispatch({ type: FETCH_CONTRACTS_FAILURE, payload: refresheror })
        }
        setContractFormOpen(false);

    } catch (error) {
        console.error('Error creating contract:', error);
        setContractFormOpen(false);
        alert("Error creating contract");
        dispatch({ type: CREATE_CONTRACT_FAILURE, payload: error })
    }
}



