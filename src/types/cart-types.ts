export interface CartState  {
    cart: {
        users: any[]
        totalPhone: number
    },
    cartLength: number,
    error: null | string
}

export enum CartActionTypes {
    GET_CARTS = "GET_CARTS",
    GET_CART_ERROR = "GET_CART_ERROR",
    GET_CART_LENGTH = "GET_CART_LENGTH",
}

interface CartActionSuccess {
    type: CartActionTypes.GET_CARTS;
    payload: any
}
interface CartActionError {
    type: CartActionTypes.GET_CART_ERROR;
    payload: string
}
interface CartActionLength {
    type: CartActionTypes.GET_CART_LENGTH;
    payload: number
}
export type CartAction = CartActionSuccess | CartActionError | CartActionLength