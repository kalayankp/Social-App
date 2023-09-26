import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { contractReducer } from "../reducers/contractReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    contractReducer,
});


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

