import { Box, Button, Card, CardActions, CardContent, IconButton,  createTheme, ThemeProvider , Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useActions, useHalpActionst } from "../../hooks/userActions";

interface PropsItems {
    item: any
}

const CardUser: FC<PropsItems> = ({item}) => {
  
  const { getUser, deleteUser} = useActions()
  const { addCart } = useHalpActionst()
  const navigate = useNavigate()


  const handleDelete = async () => {
    await deleteUser(item.id)
    getUser()
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
    </CardContent>
    <CardActions>
      <IconButton 
      aria-label='share' 
      onClick={() => addCart(item)} 
      //  color={checkPhoneInCart(item.id) ? 'secondary': 'primary' }
       >
        <ShoppingCart />
      </IconButton>
    <Button onClick={handleDelete}>delete</Button>
    <Button onClick={() => navigate(`/edit/${item.id}`)}>edit</Button>
    </CardActions>
      </Card>
    </Box>
  );
}
export default CardUser;