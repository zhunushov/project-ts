import { CartAction, CartActionTypes } from './../../types/cart-types';
import { Dispatch } from 'redux';


export function calcSubNumber(user: any){
    return user.num * user.item.phone
}

export function calcTotalPhone(users: any){
    let totalPhone = 0;
    users.forEach((elem: any) => {
        totalPhone += elem.subNum
    })
    return totalPhone
}

export function  getProductsInCart(){
    let cart = JSON.parse(`${localStorage.getItem('cart')}`);
    return cart ? cart.users.length : 0
}

export const addCart =  (user: any) => {
    console.log(user);
       
    return async (dispatch: Dispatch<CartAction>) => {
    try {
        let cart = JSON.parse(`${localStorage.getItem('cart' || '{}')}`);
        console.log(cart);
        
        if(!cart.users){
            
            cart = {
                users: [],
                totalPhone: 0
            }
        }

        let newUser = {
            item: user,
            num: 1,
            subNum: 0
        }

        let filteredCart = []
         filteredCart = cart.users.filter((elem: any) => elem.item.id === user.id)

        if(filteredCart.length > 0){
           cart.users.filter((elem: any ) => elem.item.id !== user.id)
        } else {
            cart.users.push(newUser)
        }

        localStorage.setItem('cart', JSON.stringify(user || '[]'))

        newUser.subNum = calcSubNumber(newUser)
        cart.totalPhone = calcTotalPhone(cart.users)

        dispatch({type: CartActionTypes.GET_CART_LENGTH, payload: cart.users.length})
    } catch (error: any) {        
        dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})
    }
  } 
}

export  const getCart = () => {
    return async (dispatch : Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(`${localStorage.getItem('cart')}`);

            if(!cart.users){
                cart = {
                    users: [],
                    totalPhone: 0
                }
            }  

           dispatch({type: CartActionTypes.GET_CARTS, payload: cart })
        } catch (error: any) {
           dispatch({ type: CartActionTypes.GET_CART_ERROR, payload: error}) 
        }
    }
}   

export const getCartLength = () => {
    return async (dispatch: Dispatch<CartAction>) => {
        try {
            let cart = JSON.parse(`${localStorage.getItem('cart')}`);
            if(!cart.users){
                cart = {
                    users: [],
                    totalPhone: 0
                }
            }  
           dispatch({type: CartActionTypes.GET_CART_LENGTH, payload: cart.users.length})
        } catch (error: any) {
           dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})  
        }
    }
}

export const changePhoneCount = (num: number, id: any) => {
    let cart = JSON.parse(`${localStorage.getItem('cart')}`);
    cart.users = cart.users.map((elem: any) => {
        if(elem.item.id === id){
            elem.num = num
            elem.subNum = calcSubNumber(elem)
        }
        return elem
    })
    cart.totalPhone = calcTotalPhone(cart.users)
    localStorage.setItem('cart', JSON.stringify([cart]))
    getCart()
}

export const checkPhoneInCart = (id: any) => {
    return async (dispatch: Dispatch<CartAction>) => {
    try {
        let cart = JSON.parse(`${localStorage.getItem('cart')}`);

        if(!cart.users){
            cart = {
                users: [],
                totalPhone: 0
            }
        }
        let newCart = cart.users.filter((elem: any) => elem.item.id === id)
        return newCart.length > 0 ? true : false
    } catch (error: any) {
        dispatch({type: CartActionTypes.GET_CART_ERROR, payload: error})
    } 
  }
}
  