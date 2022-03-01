import { FC, useEffect, useState } from "react";
import { Box,  Card, CardActions, CardContent, IconButton, Typography } from "@material-ui/core";
import { BookmarkBorder, Delete, Edit, ShoppingCart } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useUserActions, useCartActions, useElecActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IUser } from "../../types/IUser";

interface PropsItems {
    item: IUser
}

const CardUser: FC<PropsItems> = ({item}) => {
  const navigate = useNavigate()
  const { getUser, deleteUser } = useUserActions()

  const [color, setColor] = useState(false)
  const [colorElec, setColorElec] = useState(false)
  
  const { cart } = useTypedSelector(state => state.cart)
  const { elec } = useTypedSelector(state => state.elec)

  const { addCart, checkProductInCart, getCart } = useCartActions()
  const { addElected,  checkElec } = useElecActions()

  const handleDelete = async () => {
    await deleteUser(item.id)
    getUser()
  }
  useEffect(() => {
    checkProductInCart(item.id) ? setColor(true): setColor(false)
  },[cart])

  useEffect(() => {
    checkElec(item.id) ? setColorElec(true): setColorElec(false)
  },[elec])

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
      </Card>
    </Box>
  );
}
export default CardUser;