import { elecReducer } from './elecReducer';
import { userReducer } from './userReducer';
import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    user:  userReducer,
    cart: cartReducer,
    elec: elecReducer,
    auth: authReducer
})

export type RootState = ReturnType <typeof rootReducer>