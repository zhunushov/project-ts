import { AppBar,  Badge, Box, Button, IconButton, Input, Toolbar, Typography } from "@material-ui/core";
import { ShoppingCart, BookmarkBorder, AccessAlarm } from "@material-ui/icons";
import { useCallback, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useCartActions, useElecActions, useProductActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAuth } from "../store/action-creators/auth";

export default function MyNavbar(){
  const { cartLength } = useTypedSelector(state => state.cart)
  const { elecLength } = useTypedSelector(state => state.elec)
  const auth = useAuth()   
  const { getCartLength } = useCartActions()
  const { getElectedLength } = useElecActions()
  const { getProduct } = useProductActions()
  const [searchParams, setSearchParams] = useSearchParams()  
  const [searchVal, setSearchVal] = useState<string>(searchParams.get("q") || "")
  
  useMemo(() => {
    getCartLength()
    getElectedLength()
  }, [])
  
  useMemo(() => {
    setSearchParams({
      q: searchVal,
      _limit: '6',
      _page: '0',
    })
  }, [searchVal])

  const handleValue = useCallback((e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    getProduct()
    setSearchVal(e.target.value)
  
  }, [])
  
    
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
          <Badge badgeContent={elecLength}>
            <NavLink to={'/elec'}>
            <BookmarkBorder  />
            </NavLink>
          </Badge>
          <NavLink to={'/user'}>
            <IconButton>
              <AccessAlarm />
            </IconButton>
          </NavLink>
          { auth ? <span>{auth.email}</span> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}