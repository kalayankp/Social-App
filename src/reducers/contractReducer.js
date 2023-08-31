import { ADD_CONTRACT_OPTIONS, SET_CONTRACT_OPTIONS } from "../actionTypes/contractActiontypes";

const initialState = {
    options: []
};

export const contractReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_CONTRACT_OPTIONS:
            return {
                ...state,
                options:payload,
            };
            case ADD_CONTRACT_OPTIONS:
                return {
                    ...state,
                    options:payload
                }
            default:
                return state;

    }
}
