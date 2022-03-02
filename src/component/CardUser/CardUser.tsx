import { FC, useEffect, useState } from "react";
import { Box,  Button,  Card, CardActions, CardContent, IconButton, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
import { BookmarkBorder, Delete, Edit, ShoppingCart } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useUserActions, useCartActions, useElecActions, useCommentActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IUser } from "../../types/IUser";


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
}));

interface PropsItems {
    item: IUser
}

const CardUser: FC<PropsItems> = ({item}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [color, setColor] = useState(false)
  const [colorElec, setColorElec] = useState(false)
  
  const { addCart, checkProductInCart } = useCartActions()
  const { addElected,  checkElec } = useElecActions()
  const { addCommnet } = useCommentActions()
  const { getUser, deleteUser } = useUserActions()
  const { getComment } = useCommentActions()

  const { cart } = useTypedSelector(state => state.cart)
  const { elec } = useTypedSelector(state => state.elec)
  const { auth } = useTypedSelector(state => state.auth)
  
  const handleDelete = async () => {
    await deleteUser(item.id)
    getUser()
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
  const handleSubmit = () => {
    if(!values.text.trim()) {
      return alert('заполните поля')
    }
    const elem: any = {
        createdAt: new Date(),
          user: {
          uid: auth?.user.uid,
          email: auth?.user.email,
          photoURL: auth?.user.photoURL,
          displayName: auth?.user.displayName}}
    addCommnet(item.id, values, elem)
    setValues({text: ""})
    getComment()
  }   
  return (
    <Box sx={{ maxWidth: 275, margin: 20 }}>
      <Card variant="outlined">
      <CardContent>
      <Typography gutterBottom>
       {item.name}
      </Typography>
      <Typography variant="h5" component="div">
        {item.phone}
      </Typography>
      <Typography variant="body2">
       {item.lastName}
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

      {!auth ?
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
      {
        comment?.map((elem) => (
                elem.personId === item.id ? 
                <p>{elem.value.text}</p>:null
        ))
      }
      </Card>  
    </Box>
  );
}
export default CardUser;