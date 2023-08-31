
import { SET_CONTRACT_OPTIONS } from '../actionTypes/contractActiontypes';
import { addContract } from '../components/api/contractApi';

export const fetchContracts = () => async (dispatch) => {
    try {
        const mappedContracts = await addContract();

        if (mappedContracts.length > 0) dispatch({ type: SET_CONTRACT_OPTIONS, payload: mappedContracts });
        else {
            dispatch({ type: SET_CONTRACT_OPTIONS, payload: [{ value: 'createNew', label: 'Create New' }] })

            console.log('No contracts found for this owner_id');
        }
    } catch (error) {
        console.error('Error fetching contract:', error);
    }
}



