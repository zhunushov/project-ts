import { Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import  { useEffect } from 'react';
import { useHalpActionst } from '../../hooks/userActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';



const Cart = () => {
    const { getCart, changePhoneCount } = useHalpActionst()
    const { cart } = useTypedSelector(state => state.cart)
    console.log(cart);
   

    useEffect(() => {
        getCart()
    }, [])
    
    return (
        <TableContainer>
           <Table>
            <TableHead>
                <TableRow>
                    <TableCell>0:</TableCell>
                    <TableCell>Name:</TableCell>
                    <TableCell>LastName:</TableCell>
                    <TableCell>Phone:</TableCell>
                    <TableCell>Count:</TableCell>
                    <TableCell>Delete:</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    cart ? cart.users.map((item, index) => (
                         <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.item.name}</TableCell>
                            <TableCell>{item.item.lastName}</TableCell>
                            <TableCell>{item.item.phone}</TableCell>
                            {/* <input 
                                  type="number"
                                  value={item.num}
                                  onChange={(e) => changePhoneCount(+e.target.value, item.item.id)}
                                  min = '1'
                              /> */}
                            <TableCell>{item.item.phone}</TableCell>
                         </TableRow>
 
                    )): <h1>loading...</h1>
                }
                <TableCell>Total</TableCell>
                <TableCell>{cart.totalPhone}</TableCell>
             </TableBody>
            </Table> 
        </TableContainer>
    );
};

export default Cart;