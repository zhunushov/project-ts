import { Box, Button, TextField, Typography } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../hooks/userActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type ParamsEditedUser = {
    id: string
}

const EditUser: FC = () => {
    const navigate = useNavigate()
    const {id} = useParams<ParamsEditedUser>()
    const {edit, error, loading} = useTypedSelector(state => state.user)    
    const { saveEditedUser, editUser, getUser } = useActions()
    const [values, setValues] = useState({name: '',lastName: '',phone: 0, price: 0})

    useEffect(() => {
        if(edit)
        setValues(edit)
    },[edit])
    
    useEffect(() => {
       editUser(id)
    },[id])
    
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error) {
        return <h1>{error}</h1>
    }
    const handleSubmit = () => {
        if( !values.name && !values.lastName && !values.phone && !values.price){
            return
        }
        setValues({name: '', lastName: "", phone: 0, price: 0})
        saveEditedUser(id, values)
        navigate('/user')
        getUser()
    }
    return (
        <div style={{display: "flex", justifyContent: "space-around", color: "black"}}>
        <Box style={{width: '450px',display: 'flex',alignItems: 'center', flexDirection: 'column',justifyContent: 'center', marginTop: '20px'}}>
        <Typography variant='h4' >Edit User</Typography>
        <TextField style={{padding : '5px'}} variant='outlined' label='Name' value={values.name} onChange={e => setValues({...values, name: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='LastName' value={values.lastName} onChange={e => setValues({...values, lastName: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Number' value={values.phone} onChange={e => setValues({...values, phone: +e.target.value})}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Price' value={values.price} onChange={e => setValues({...values, price: +e.target.value})}/>
        <Button variant='contained' onClick={handleSubmit}>Save </Button> 
        </Box>
        </div>
    );
}; 
 
export default EditUser;