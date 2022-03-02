
import { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useAuthActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  link: {
    textDecoration: 'none'
  }
}));

const Login: FC = () => {
  const { SignIn } = useAuthActions()
  const { error } = useTypedSelector(state => state.auth)
  
  const classes = useStyles();
  const [values, setValues] = useState({email:"",password:""});

  const handleSubmit = (e : any) => {
    e.preventDefault();
    SignIn(values.email, values.password)
    console.log(values);
  };

  if(error) {
    return <h1>{error}</h1>
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={values.email}
        onChange={e => setValues({...values, email: e.target.value})}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={values.password}
        onChange={e => setValues({...values, password: e.target.value})}
      />
      <div>
        <Link to={'/user'} className={classes.link}>
        <Button variant="contained" >
          Cancel❤
        </Button>
        </Link>
         <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Login;