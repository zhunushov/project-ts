import { ProductAction, ProductState, ProductActionTypes } from '../../types/product-types';

const INIT_STATE: ProductState = {
   products: [],
   error: null,
   loading: false,
   edit: {},
   pagination: 1
}  

export const productReducer = (state = INIT_STATE, action: ProductAction): ProductState => {
    switch(action.type) {
        case ProductActionTypes.FETCH_PRODUCT:
            return {...state, loading: true}
        case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
            return {...state, loading: false, products: action.payload.data,
                    pagination: Math.ceil(action.payload.headers["x-total-count"] / 6)}
        case ProductActionTypes.FETCH_PRODUCT_ERROR:
            return {...state, loading: false, error: action.payload}
        case ProductActionTypes.FETCH_PRODUCT_UPDATE:
            return {...state, loading: false, edit: action.payload}
        default: return state 
    }
}