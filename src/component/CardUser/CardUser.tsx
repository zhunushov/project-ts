import { FC, useEffect, useState } from "react";
import { Box,  Card, CardActions, CardContent, IconButton, Typography } from "@material-ui/core";
import { BookmarkBorder, Delete, Edit, ShoppingCart } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useActions, useHalpActionst } from "../../hooks/userActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IUser } from "../../types/IUser";

interface PropsItems {
    item: IUser
}
const CardUser: FC<PropsItems> = ({item}) => {
  const navigate = useNavigate()
  const [color, setColor] = useState(false)

  const { getUser, deleteUser } = useActions()
  const { addCart, checkProductInCart, getCart } = useHalpActionst()

  const { cart } = useTypedSelector(state => state.cart)
  
  const handleDelete = async () => {
    await deleteUser(item.id)
    getUser()
  }

  const handleAddCart = (item: IUser) => {
    addCart(item)
    getCart()
  }

  useEffect(() => {
    checkProductInCart(item.id) ? setColor(true): setColor(false)
  },[cart])

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
     <IconButton 
      color={color ? 'primary' : 'inherit'}
      aria-label='share' 
      onClick={() => handleAddCart(item)}>
      <ShoppingCart/></IconButton>
     <IconButton onClick={handleDelete}><Delete/></IconButton>
     <IconButton onClick={() => navigate(`/edit/${item.id}`)}><Edit/></IconButton>
     <IconButton><BookmarkBorder/></IconButton>
    </CardActions>
      </Card>
    </Box>
  );
}
export default CardUser;