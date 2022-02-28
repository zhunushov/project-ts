import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddTodo from '../component/AddUser/AddUser';
import Cart from '../component/Cart/Cart';
import EditUser from '../component/EditUser/EditUser';
import ListUser from '../component/ListUser/LIstUser';
import MyNavbar from '../component/MyNavbar/MyNavbar';
const MyRoutes: FC = () => {
    return (
        <>
        <MyNavbar />
        <Routes>
            <Route path='/' element={<AddTodo />} />
            <Route path='/user' element={<ListUser />} />
            <Route path='/edit/:id' element={<EditUser />} />
            <Route path='/cart' element={<Cart />} />
        </Routes>
        </>
    );
};

export default MyRoutes;