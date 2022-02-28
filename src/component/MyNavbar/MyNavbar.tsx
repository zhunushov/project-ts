import { AppBar, Avatar, Badge, Box, Button, IconButton, Input, Toolbar, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useActions, useHalpActionst } from "../../hooks/userActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";


export default function MyNavbar(){
  const { cartLength } = useTypedSelector(state => state.cart)
  const { getCartLength } = useHalpActionst()
  const { getUser } = useActions()
  
  const [searchParams, setSearchParams] = useSearchParams()  
  const [searchVal, setSearchVal] = useState<string>(searchParams.get("q") || "")

  useEffect(() => {
    setSearchParams({
      q: searchVal,
      _limit: '6',
      _page: '0',
    })
  }, [searchVal])

  useEffect(() => {
    getCartLength()
  }, [])

  const handleValue = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchVal(e.target.value)
    getUser()
  }
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
      <AppBar position="static">
        <Toolbar>
            <Typography >
             News
           </Typography>
          <Button color="inherit">Login</Button>
          <Input placeholder="Search" value={searchVal} onChange={(e) => handleValue(e)} />
          <Badge badgeContent={cartLength}>
            <NavLink to={'/cart'}>
            <ShoppingCart />
            </NavLink>
          </Badge>
          <NavLink to={'/user'}>
            <IconButton>
              <Avatar sizes=" small" />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}