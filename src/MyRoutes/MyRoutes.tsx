import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Chat from '../Chat/Chat';
import AddProduct from '../component/AddProduct/AddProduct';
import Cart from '../component/Cart/Cart';
import EditUser from '../component/EditProduct/EditProduct';
import Elec from '../component/Elec/Elec';
import ListUser from '../component/ListProduct/ListProduct';
import MyNavbar from '../MyNavbar/MyNavbar';

const MyRoutes: FC = () => {
    return (
        <>  
        <MyNavbar />
        <Routes>
            <Route path='/add' element={<AddProduct />} />
            <Route path='/' element={<ListUser />} />
            <Route path='/edit/:id' element={<EditUser />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/elec' element={<Elec/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/chat' element={<Chat/>} />
        </Routes>
        </>
    );
};

export default MyRoutes;