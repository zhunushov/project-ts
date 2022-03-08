import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import  { useEffect } from 'react';
import { useCartActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ICart } from '../../types/ICart';



const Cart = () => {
    const { getCart, changeProductCount, deleteCart , getCartLength } = useCartActions()
    const { cart, error } = useTypedSelector(state => state.cart)
    
    useEffect (()  => {
        getCart()
    },[])

    const handleDeleteCart = (item: ICart, price: number) => {
        deleteCart(item, price)
        getCartLength()
        getCart()
    }
    
    if(error) {
        return <h1>{error}</h1>
    }
    
    return (
        <TableContainer>
            <Table>
             <TableHead>
                <TableRow>
                    <TableCell>+</TableCell>
                    <TableCell>Title:</TableCell>
                    <TableCell>photo:</TableCell>
                    <TableCell>Price:</TableCell>
                    <TableCell>Count:</TableCell>
                    <TableCell>SubPrice:</TableCell>
                    <TableCell>Delete:</TableCell>
                </TableRow>
             </TableHead>
            <TableBody>
                {
                    cart.products?.map((item: any, index: number) => (
                         <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.item.title}</TableCell>
                            <TableCell>{item.item.photo}</TableCell>
                            <TableCell>{item.item.price}</TableCell>
                            <TableCell>
                            <input type="number" value={item.count} min = '1'
                             onChange={(e) => changeProductCount(+e.target.value, item.item._id)}/>
                            </TableCell>
                            <TableCell>{item.subPrice}</TableCell>
                            <TableCell>
                            <IconButton onClick={() => handleDeleteCart(item.item._id, item.item.price)} > 
                             <Delete /> 
                            </IconButton>
                            </TableCell>
                         </TableRow>
                    ))
                }
                <TableCell>Total</TableCell>
                <TableCell>{cart.totalPrice}</TableCell>
             </TableBody>
            </Table> 
        </TableContainer>
    );
};

export default Cart;