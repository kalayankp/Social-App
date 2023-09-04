import { CREATE_CONTRACT_FAILURE, CREATE_CONTRACT_SUCCESS, FETCH_CONTRACTS_FAILURE, FETCH_CONTRACTS_SUCCESS, } from '../actionTypes/contractActiontypes';
import { fetchContractsApi, getContractsApi } from '../components/api/contractApi';



export const fetchContracts = () => async (dispatch) => {
    try {
        const result = await fetchContractsApi();

        if (result.error) {
            console.error('Error fetching contract from contractAction 20:', result.error);

            dispatch({ type: FETCH_CONTRACTS_FAILURE, payload: result.error })
            return;
        }


        dispatch({ type: FETCH_CONTRACTS_SUCCESS, payload: result.data })
    } catch (error) {

        dispatch({ type: FETCH_CONTRACTS_FAILURE, payload: error })
        console.error('Error fetching contract', error);
    }
};



export const AddNewContract = (setContractFormOpen, clauses, title) => async (dispatch) => {

    try {
        const result = await getContractsApi(clauses, title);

        if (result.success) {
            alert("contract  created successfully")
            dispatch({ type: CREATE_CONTRACT_SUCCESS, payload: result.data })
        }
        else {
            console.error('Error creating contract:', result.error);
            setContractFormOpen(false);
            alert('Error creating contract');

            dispatch({ type: FETCH_CONTRACTS_FAILURE, payload: result.error })

        }

    } catch (error) {
        console.error('Error creating contract 89:', error);
        setContractFormOpen(false);
        alert('Error creating contract 91');

        dispatch({ type: CREATE_CONTRACT_FAILURE, payload: error })
    }
}





