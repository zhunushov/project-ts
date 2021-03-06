import { ProductAction, ProductActionTypes } from '../../types/product-types';
import { Dispatch } from "redux"
import axios from 'axios';
import { API, PRODUCT } from '../../Halpers/Halpers';

export const addProduct = (newProduct: any) => {
    return async (dispatch: Dispatch <ProductAction>) => {
        try {
            dispatch({type: ProductActionTypes.FETCH_PRODUCT})
            await axios.post(`${API}/${PRODUCT}`, newProduct)
            getProduct()
        } catch (error: any) {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCT_ERROR, payload: error})
        }
    }
}

export const getProduct = () => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {            
            dispatch({type: ProductActionTypes.FETCH_PRODUCT})
            const res = await axios(`${API}/${PRODUCT}/${window.location.search}`)
            dispatch({type: ProductActionTypes.FETCH_PRODUCT_SUCCESS, payload: res})
        } catch (error: any) {
            dispatch({type: ProductActionTypes.FETCH_PRODUCT_ERROR, payload:error})
        }
    }
}

export const deleteProduct = (item: any) => {
    return async (dispatch: Dispatch <ProductAction>) => {
        try {
             await axios.delete(`${API}/${PRODUCT}/${item.id}`)
        } catch (error: any) {
            dispatch({type: ProductActionTypes.FETCH_PRODUCT_ERROR, payload: error})
        }
    }
}

export const editProduct = (id: any) => {
    return async (dispatch: Dispatch <ProductAction>) => {
        try {
            const { data } = await axios(`${API}/${PRODUCT}/${id}`)
            dispatch({type: ProductActionTypes.FETCH_PRODUCT_UPDATE, payload: data})
        } catch (error: any) {
            console.log(error)
           dispatch({type: ProductActionTypes.FETCH_PRODUCT_ERROR, payload: error}) 
        }
    }
}

export const saveEditedProduct = (id: string, editedProduct: any) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({type: ProductActionTypes.FETCH_PRODUCT})
            await axios.put(`${API}/${PRODUCT}/${id}`, editedProduct)
            getProduct()
        } catch (error: any) {
            console.log(error)
            dispatch({type: ProductActionTypes.FETCH_PRODUCT_ERROR, payload: error})
        }
    }
}