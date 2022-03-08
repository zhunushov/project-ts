import { ICart } from './../../types/ICart';
import { Dispatch } from 'redux';
import { CartAction, CartActionTypes } from '../../types/cart-types';
import { IProduct } from '../../types/IProduct';


export function calcSubPrice(values: any){
    return values.count * values.item.price
}

export function calcTotalPrice(values: ICart[]){
    let totalPrice = 0;
    values.forEach((elem: any) => {
        totalPrice += elem.subPrice
    })
    return totalPrice
}

export const addCart = (values: any) => {
    return  (dispatch: Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(`${localStorage.getItem('cart')}`);

            if(!cart){
                cart = {
                    products: [],
                    totalPrice: 0
                }
            }
            let newProduct = {
                item: values,
                count: 1,
                subPrice: 0
            }
            let filteredCart = cart.products.filter((elem: any) => elem.item._id === values._id)
             
            if(filteredCart.length > 0){

                cart.products = cart.products.filter((elem: any) => elem.item._id !== values._id)

            } else {

                cart.products.push(newProduct)

            }

            newProduct.subPrice = calcSubPrice(newProduct)

            cart.totalPrice = calcTotalPrice(cart.products)

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({type: CartActionTypes.GET_CART_LENGTH, payload: cart.products.length})
            dispatch({type: CartActionTypes.GET_CARTS, payload: cart})
        } catch (error: any) {
            console.log(error)
            dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})
        }
    }
}


export const getCartLength = () => {
    return  (dispatch : Dispatch<CartAction>) => {
        try {
          let cart = JSON.parse(`${localStorage.getItem('cart')}`);
            if(!cart){
                cart = {
                    products: [],
                    totalPrice: 0
                }
            }
            dispatch({type: CartActionTypes.GET_CART_LENGTH, payload: cart.products.length})
        } catch (error: any) {
           dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error}) 
        }
    }
}

export const getCart = () => {
    return (dispatch: Dispatch<CartAction>) => {
        try {
             let cart =  JSON.parse(`${localStorage.getItem('cart')}`);
            if(!cart){
                cart = {
                    products: [],
                    totalPrice: 0
                }
            }

            dispatch({type: CartActionTypes.GET_CARTS, payload: cart})
        } catch (error: any) {
            dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})
        }
    }
}

export const changeProductCount = (count: number, id: IProduct) => {
    return (dispatch: Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(localStorage.getItem('cart') as string);
            cart.products = cart.products.map((elem: any) => {
                if(elem.item._id === id){
                    elem.count = count
                    elem.subPrice = calcSubPrice(elem)
                }
                return elem
            })
            cart.totalPrice = calcTotalPrice(cart.products)
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({type: CartActionTypes.GET_CARTS, payload: cart})
        } catch (error: any) {
            dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})
        }
    }
}

export const checkProductInCart = (id: number) => {
    return (dispatch: Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(`${localStorage.getItem('cart')}`);
            if(!cart){
                cart = {
                    products: [],
                    totalPrice: 0
                }
            }
            let newCart = cart.products.find((elem: any) => elem.item._id === id)
            console.log(newCart, "new")
            return newCart ? true : false
        } catch (error: any) {
            dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})
        }   
    }
}
 
export const deleteCart =(id: ICart, price: number) => {
    return (dispatch: Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(`${localStorage.getItem('cart')}`)
            if(!cart) {
                cart = {
                    products: []
                }
            } 
            for (let i = 0; i < cart.products.length; i++) { 
                let Item = cart.products[i].item._id 
                let Price = cart.products[i].item.price
               
                if (Item === id) { 
                    cart.products.splice(i, 1); 

                } if (Price === price){

                  cart.totalPrice = cart.totalPrice - price 
                } 
            } 
            cart = JSON.stringify(cart); 
            localStorage.setItem("cart", cart);
            dispatch({type: CartActionTypes.GET_CARTS, payload: cart})
        } catch (error: any) {
            dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error + "delete Cart"})
        }
    }
}
