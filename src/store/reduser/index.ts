import { elecReducer } from './elecReducer';
import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { commentReducer } from './commentReduce';
import { productReducer } from './productReducer';

export const rootReducer = combineReducers({
    product:  productReducer,
    cart: cartReducer,
    elec: elecReducer,
    auth: authReducer,
    comment: commentReducer
})

export type RootState = ReturnType <typeof rootReducer>