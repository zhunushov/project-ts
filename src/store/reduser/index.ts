import { elecReducer } from './elecReducer';
import { userReducer } from './userReducer';
import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';

export const rootReducer = combineReducers({
    user:  userReducer,
    cart: cartReducer,
    elec: elecReducer
})

export type RootState = ReturnType <typeof rootReducer>