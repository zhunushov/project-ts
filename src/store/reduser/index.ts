import { elecReducer } from './elecReducer';
import { userReducer } from './userReducer';
import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { commentReducer } from './commentReduce';

export const rootReducer = combineReducers({
    user:  userReducer,
    cart: cartReducer,
    elec: elecReducer,
    auth: authReducer,
    comment: commentReducer
})

export type RootState = ReturnType <typeof rootReducer>