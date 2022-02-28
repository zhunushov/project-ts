import { Box, Button, TextField, Typography } from "@material-ui/core";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/useActions";


const AddTodo: FC = () => {
    const navigate = useNavigate()
    const { addUser, getUser } = useUserActions()
    const [values, setValues] = useState({name: '',lastName: '',phone: 0, price: 0})
    const handleSubmit = () => {
        if(!values.name && !values.lastName && !values.phone && !values.price){
            return
        }
        setValues({name: '', lastName: "", phone: 0, price: 0})
        addUser(values)
        navigate('/user')
        getUser()
    }
    return (
        <div style={{display: "flex", justifyContent: "space-around", color: "black"}}>
        <Box style={{width: '450px',display: 'flex',alignItems: 'center', flexDirection: 'column',justifyContent: 'center', marginTop: '20px'}}>
        <Typography variant='h4' >Add User</Typography>
        <TextField style={{padding : '5px'}} variant='outlined' label='Name' value={values.name} onChange={e => setValues({...values, name: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='LastName' value={values.lastName} onChange={e => setValues({...values, lastName: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Number' value={values.phone} onChange={e => setValues({...values, phone: +e.target.value})}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Price' value={values.price} onChange={e => setValues({...values, price: +e.target.value})}/>
        <Button variant='contained' onClick={handleSubmit}>Add </Button> 
        </Box>
        </div>
    );
}; 
 
export default AddTodo;