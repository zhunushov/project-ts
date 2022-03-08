import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type ParamsEditedProduct = {
    id: any 
}

const EditProduct: FC = () => {
    const navigate = useNavigate()
    const {id} = useParams<ParamsEditedProduct >()
    const { edit, error, loading} = useTypedSelector(state => state.product)    
    const { saveEditedProduct, editProduct, getProduct } = useProductActions()
    const [values, setValues] = useState({title: '',type: '',photo: '', price: 0})

    useMemo(() => {
        if(edit){
            setValues(edit)
        }
    },[edit])
    
    useMemo(() => {
       editProduct(id)
    },[id])
    
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error) {
        return <h1>{error}</h1>
    }
    const handleSubmit = () => {
        if( !values.title && !values.type && !values.photo && !values.price){
            return
        }
        setValues({title: '', type: "", photo: '', price: 0})
        saveEditedProduct(id, values)
        navigate('/')
        getProduct()
    }
    return (
        <div style={{display: "flex", justifyContent: "space-around", color: "black"}}>
        <Box style={{width: '450px',display: 'flex',alignItems: 'center', flexDirection: 'column',justifyContent: 'center', marginTop: '20px'}}>
        <Typography variant='h4' >Edit Product</Typography>
        <TextField style={{padding : '5px'}} variant='outlined' label='Title' value={values.title} onChange={e => setValues({...values, title: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Type' value={values.type} onChange={e => setValues({...values, type: e.target.value })}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Image' value={values.photo} onChange={e => setValues({...values, photo: e.target.value})}/>
        <TextField style={{padding : '5px'}} variant='outlined' label='Price' value={values.price} onChange={e => setValues({...values, price: +e.target.value})}/>
        <Button variant='contained' onClick={handleSubmit}>Save </Button> 
        </Box>
        </div>
    );
}; 
 
export default EditProduct;