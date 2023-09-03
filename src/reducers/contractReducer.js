import { ADD_CONTRACT_OPTIONS, CREATE_CLAUSE_FAILURE, CREATE_CLAUSE_SUCCESS, CREATE_CONTRACT_FAILURE, CREATE_CONTRACT_SUCCESS, FETCH_CONTRACTS_FAILURE, FETCH_CONTRACTS_SUCCESS, SET_CONTRACT_OPTIONS } from "../actionTypes/contractActiontypes";

const initialState = {
    options: [],
    //  contracts: [],
    error: null,
};

export const contractReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_CONTRACT_SUCCESS:
            return {
                ...state,
                error: null,
                options: [...state.options, payload],
            };
       
        case CREATE_CONTRACT_FAILURE:
        case FETCH_CONTRACTS_FAILURE:

            return {
                ...state,
                error: payload
            }
        case FETCH_CONTRACTS_SUCCESS:
            return {
                ...state,
                options: payload,
                error: null,

            }
       
        default:
            return state;

    }
}
