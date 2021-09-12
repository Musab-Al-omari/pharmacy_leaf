import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Button, Link, Typography } from '@material-ui/core';
import image from '../assets/large_pharmacyleaf.png';
import axios from 'axios';
import { Base64 } from 'js-base64';
import { useAuth } from '../provider/AuthProvider';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '400px',
    background: '#f2f3f5 ',
    marginTop: '30px',
    marginBottom: '30px',
    width: 'clamp(300px,50vw,700px)',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: '20px',
  },
  box: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  Button: {
    background: '#24aeb1',
    margin: 8,
    marginTop: 50,
  },
  mainBarImage: {
    height: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  text: {
    textAlign: 'center',
  },
  textLink: {
    textDecoration: 'none',
    color: '#60ac45 ',
  },
}));
export default function Login() {
  const classes = useStyles();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { auth, setAuth } = useAuth();
  const history = useHistory();

  async function login() {
    try {
      const encoded = Base64.encode(`${loginData.email}:${loginData.password}`);

      const url = 'https://pharmacyleaf.herokuapp.com/api/users/signin';
      // const url = 'http://localhost:3002/api/users/signin';
      const res = await axios.post(
        url,
        {},
        { headers: { Authorization: `Basic ${encoded}` } }
      );

      setAuth(res.data);
      history.push('/products');
    } catch (error) {
      console.log('the email ', error);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <img
          src={image}
          className={classes.mainBarImage}
          alt="src/assets/gmail.png"
        />
      </div>

      <TextField
        id="standard-full-width"
        label="Email"
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        style={{ margin: 8, marginTop: 20 }}
        placeholder="Example@example.com"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Divider variant="inset" />
      <TextField
        type="password"
        id="standard-full-width"
        label="password"
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        style={{ margin: 8, marginTop: 20 }}
        placeholder="12345"
        fullWidth
        margin="normal"
        // helperText={ali}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Divider className={classes.Divider} variant="inset" />
      <Button
        onClick={login}
        className={classes.Button}
        variant="contained"
        color="primary"
        fullWidth
      >
        LogIn
      </Button>

      <Typography variant="body1" className={classes.text}>
        Create New Account ?
        <Link href="/Register" className={classes.textLink}>
          {' '}
          Register
        </Link>
      </Typography>
    </div>
  );
}
