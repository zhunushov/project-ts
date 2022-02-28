import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import  { useEffect } from 'react';
import { useHalpActionst } from '../../hooks/userActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';



const Cart = () => {
    const { getCart, changeProductCount, deleteCart } = useHalpActionst()
    const { cart, error } = useTypedSelector(state => state.cart)
    

    useEffect (()  => {
        getCart()
    }, [] )

    const handleChangeCount = (count: any, id: string) => {
        changeProductCount(count, id)
        getCart()
    }

    const handleDeleteCart = (item: any, price: any) => {
        deleteCart(item, price)
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
                    <TableCell>Name:</TableCell>
                    <TableCell>Phone:</TableCell>
                    <TableCell>Price:</TableCell>
                    <TableCell>Count:</TableCell>
                    <TableCell>SubPrice:</TableCell>
                    <TableCell>Delete:</TableCell>
                </TableRow>
             </TableHead>
            <TableBody>
                {
                    cart.users?.map((item: any, index: number) => (
                         <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.item.name}</TableCell>
                            <TableCell>{item.item.phone}</TableCell>
                            <TableCell>{item.item.price}</TableCell>
                            <TableCell>
                            <input type="number" value={item.count} min = '1'
                             onChange={(e) => handleChangeCount(e.target.value, item.item.id)}/>
                            </TableCell>
                            <TableCell>{item.subPrice}</TableCell>
                            <TableCell>
                            <IconButton onClick={() => handleDeleteCart(item.item.id, item.item.price)}> 
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