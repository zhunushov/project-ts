import { Box, Button, TextField, Typography } from "@material-ui/core";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductActions } from "../../hooks/useActions";


const AddProduct: FC = () => {
    const navigate = useNavigate()
    const { addProduct, getProduct } = useProductActions()
    const [values, setValues] = useState({title: '',type: '',photo: 0, price: 0})
    const handleSubmit = () => {
        if(!values.title && !values.type  && !values.photo && !values.price){
            return
        }
        setValues({title: '', type: "", photo: 0, price: 0})
        addProduct(values)
        navigate('/')
        getProduct()
    }
    return (
        <div style={{display: "flex", justifyContent: "space-around", color: "black"}}>
        <Box style={{width: '450px',display: 'flex',alignItems: 'center', flexDirection: 'column',justifyContent: 'center', marginTop: '20px'}}>
        <Typography variant='h4' >Add Product</Typography>
        <TextField style={{padding : '5px'}} variant='outlined' label='title' value={values.title} onChange={e => setValues({...values, title: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='type' value={values.type} onChange={e => setValues({...values, type: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Number' value={values.photo} onChange={e => setValues({...values, photo: +e.target.value})}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Price' value={values.price} onChange={e => setValues({...values, price: +e.target.value})}/>
        <Button variant='contained' onClick={handleSubmit}>Add </Button> 
        </Box>
        </div>
    );
}; 
 
export default AddProduct;