export const  API = 'http://localhost:8000/user';

export function calcSubPrice(values: any){
    return values.count * values.item.price
}

export function calcTotalPrice(values: any){
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