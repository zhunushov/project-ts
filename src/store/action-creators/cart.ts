import { ICart } from './../../types/ICart';
import { Dispatch } from 'redux';
import { CartAction, CartActionTypes } from '../../types/cart-types';
import { IUser } from './../../types/IUser';


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

export function getProductsInCart(){
    let cart = JSON.parse(localStorage.getItem('cart')|| '')
    return cart ? cart.products.length : 0
}

export const addCart = (values: IUser) => {
    return  (dispatch: Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(`${localStorage.getItem('cart')}`);
            
            if(!cart){
                cart = {
                    users: [],
                    totalPrice: 0
                }
            }
            let newUser = {
                item: values,
                count: 1,
                subPrice: 0
            }
            let filteredCart = cart.users.filter((elem: any) => elem.item.id === values.id)

            if(filteredCart.length > 0){

                cart.users = cart.users.filter((elem: any) => elem.item.id !== values.id)

            } else {

                cart.users.push(newUser)

            }

            newUser.subPrice = calcSubPrice(newUser)

            cart.totalPrice = calcTotalPrice(cart.users)

            localStorage.setItem('cart', JSON.stringify(cart))

            dispatch({type: CartActionTypes.GET_CART_LENGTH, payload: cart.users.length})
            dispatch({type: CartActionTypes.GET_CARTS, payload: cart})
        } catch (error: any) {
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
                    users: [],
                    totalPrice: 0
                }
            }
            dispatch({type: CartActionTypes.GET_CART_LENGTH, payload: cart.users.length})
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
                    users: [],
                    totalPrice: 0
                }
            }

            dispatch({type: CartActionTypes.GET_CARTS, payload: cart})
        } catch (error: any) {
            dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})
        }
    }
}

export const changeProductCount = (count: number, id: IUser) => {
    return (dispatch: Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(localStorage.getItem('cart') as string);
            cart.users = cart.users.map((elem: any) => {
                if(elem.item.id === id){
                    elem.count = count
                    elem.subPrice = calcSubPrice(elem)
                }
                return elem
            })
            cart.totalPrice = calcTotalPrice(cart.users)
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
                    users: [],
                    totalPrice: 0
                }
            }
            let newCart = cart.users.find((elem: any) => elem.item.id === id)
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
                    users: []
                }
            } 
            for (let i = 0; i< cart.users.length; i++) { 
              let targetItem = JSON.parse(cart.users[i].item.id); 
              let targetItemPrice = JSON.parse(cart.users[i].item.price); 
               
                if (targetItem === id) { 
                    cart.users.splice(i, 1); 
                } 
        
                if (targetItemPrice === price){ 
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
