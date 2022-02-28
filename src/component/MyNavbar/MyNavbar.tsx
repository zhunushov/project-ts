import { AppBar, Badge, Box, Button, Input, Toolbar, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useActions, useHalpActionst } from "../../hooks/userActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";


export default function MyNavbar(){
  const { cartLength } = useTypedSelector(state => state.cart)
  const { getCartLength } = useHalpActionst()
  
  const [searchParams, setSearchParams] = useSearchParams()  
  const [searchVal, setSearchVal] = useState<string>(searchParams.get("q") || "")
  const { getUser } = useActions()

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
    <Box sx={{ flexGrow: 1 }}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}