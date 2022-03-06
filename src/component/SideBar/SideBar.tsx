import { Button, MenuItem, Select } from '@material-ui/core';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductActions } from '../../hooks/useActions';

const SideBar = () => {

    const { getProduct } = useProductActions()
    const navigate = useNavigate()
    const search = new URLSearchParams(window.location.search)
    const [type, setType] = useState<string>(`${search.get("type")}`) 
    


    const handleChange =  (e: string, v: any ) => {
        search.set(e, v)
        let newPath = `${window.location.pathname}?${search}`
        navigate(newPath)
        setType(`${search.get("type")}`)
        getProduct()
    }

    const handleClear = () => {
        setType('')
        navigate("/")
        getProduct()
    }
    
    return (
        <div>
           <Select 
             value={type} label="Type"
             onChange={e => handleChange("type", e.target.value)}>
             <MenuItem value={'apple'}>Apple</MenuItem>
             <MenuItem value={'samsung'}>Samsung</MenuItem>
            </Select> 
            <Button  onClick={handleClear}>all </Button>
        </div>
    );
};

export default SideBar;