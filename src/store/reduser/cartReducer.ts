import { CartState, CartAction, CartActionTypes } from './../../types/cart-types';

const INIT_STATE: CartState = {
   cart: {},
   cartLength: 0,
   error: null
}

export const cartReducer = (state = INIT_STATE, action: CartAction): CartState => {
    switch(action.type){
        case CartActionTypes.GET_CARTS:
            return {...state, cart: action.payload}
        case CartActionTypes.GET_CART_ERROR:
            return {...state, error: action.payload}
        case CartActionTypes.GET_CART_LENGTH:
            return {...state, cartLength: action.payload}
        default: return state
    }
}