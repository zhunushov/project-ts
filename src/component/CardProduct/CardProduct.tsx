import { FC, useEffect, useState } from "react";
import {  Avatar, Box,  Button,  Card, CardActions, CardContent, IconButton, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
import { BookmarkBorder, Delete, Edit, ShoppingCart } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useProductActions, useCartActions, useElecActions, useCommentActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IProduct } from "../../types/IProduct";
import { useAuth } from "../../store/action-creators/auth";


const useStyles = makeStyles(theme => ({
  btn: {
    width: '10px',
    height: '3px',
    fontFamily: 'bold',
    fontSize: '9px',
  },
  inp: {
    marginBottom: '50px',
  },   
  avatar: {
    height: 20,
    width: 20,
    display: 'flex',
    margin: '0px',
    color: 'red',
    
 },
 cart: {
     margin: 5
 },
 email: {
     fontSize: 10
 }
}));

interface PropsItems {
    item: IProduct
}

const CardProduct: FC<PropsItems> = ({item}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [color, setColor] = useState(false)
  const [colorElec, setColorElec] = useState(false)
  
  const { addCart, checkProductInCart } = useCartActions()
  const { addElected,  checkElec } = useElecActions()
  const { addCommnet } = useCommentActions()
  const { getProduct, deleteProduct } = useProductActions()
  const { getComment, deleteComment } = useCommentActions()

  const { cart } = useTypedSelector(state => state.cart)
  const { elec } = useTypedSelector(state => state.elec)
  const auth = useAuth()
  
  const handleDelete = async () => {
    await deleteProduct(item.id)
    getProduct()
  }

  useEffect(() => {
    checkProductInCart(item.id) ? setColor(true): setColor(false)
  },[cart])

  useEffect(() => {
    getComment()
  }, [])

  useEffect(() => {
    checkElec(item.id) ? setColorElec(true): setColorElec(false)
  },[elec])

  //!COMMENT

  const { comment } = useTypedSelector(state => state.comment)  
  const [values, setValues] = useState({text: ''})

  const handleSubmit = async () => {
    if(!values.text.trim()){
      return alert('заполните поля')}
    const elem: any = {
        createdAt: new Date(),
        uid: auth?.uid,
        email: auth?.email,
        photoURL: auth?.photoURL,
        displayName: auth?.displayName}

    await addCommnet(item.id, values, elem)
    getComment()
    setValues({text: ""})
  } 

  const handledeleteComment = async (id: number) => {
    await deleteComment(id)
          getComment()
  } 

  return (
    <Box sx={{ maxWidth: 275, margin: 20 }}>
      <Card variant="outlined">
      <CardContent>
      <Typography gutterBottom>
       {item.title}
      </Typography>
      <Typography variant="h5" component="div">
        {item.type}
      </Typography>
      <Typography variant="body2">
       {item.photo}
      </Typography>
      <Typography variant="body2">
       {item.price}
      </Typography>
      </CardContent>
      <CardActions>

     <IconButton onClick={() => addCart(item)} color={color ? 'primary' : 'inherit'}>
     <ShoppingCart/></IconButton>

     <IconButton onClick={handleDelete}><Delete/></IconButton>
     <IconButton onClick={() => navigate(`/edit/${item.id}`)}><Edit/></IconButton>

     <IconButton onClick={() => addElected(item)} color={colorElec ? 'secondary' : 'inherit'} >
     <BookmarkBorder/></IconButton>
     </CardActions>

      {auth ?
        <TextField 
            onChange={(e) => setValues({...values, text: e.target.value})}
            className={classes.inp}  value={values.text}
            placeholder="Commnets...."variant="outlined"
            InputProps={{endAdornment:(
        <InputAdornment position="end"> 
           <IconButton>
            <Button className={classes.btn}
                    onClick={handleSubmit}>
                Отправить....
             </Button>
            </IconButton>
        </InputAdornment>)}}/>:null
      }
      {comment?.map((elem) => elem.productId === item.id ? 
                <Card className={classes.cart} key={elem.id}>
                <Typography gutterBottom >
                    <span>
                 <Avatar src={elem.user.photoURL} className={classes.avatar} />
                    </span>
                   <Typography className={classes.email}>{elem.user.displayName || elem.user.email}</Typography>  
                   <Typography> {elem.value.text}</Typography>  
                   <IconButton onClick={() => handledeleteComment(elem.id)}>
                       <Delete />
                   </IconButton>
                </Typography>
               </Card>
      :null)}
      </Card>  
    </Box>
  );
}
export default CardProduct;