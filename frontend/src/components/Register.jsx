import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Button, Link, Typography } from '@material-ui/core';
import image from '../assets/large_pharmacyleaf.png';
import axios from 'axios';
import AlertDialog from './Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '550px',
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
export default function Register() {
  const classes = useStyles();

  const [NewUser, setNewUser] = useState({});
  const [showAlertObj, setShowAlertObj] = useState({ renderAlert: false });

  async function registerNewAdmin() {
    try {
      const url = 'https://pharmacyleaf.herokuapp.com/api/users/signup';
      //   const url = 'http://localhost:3002/api/users/signup';
      const res = await axios.post(url, NewUser);
      if (res.data.message) {
        setShowAlertObj({
          renderAlert: true,
          title: 'there are error?',
          message: 'the email exist already',
          flag: true,
          historyFlag: { flag: false, route: '' },
        });
      } else {
        setShowAlertObj({
          renderAlert: true,
          title: 'You registered',
          message:
            'you registered as a new admin would you like to go to the login screen?',
          flag: true,
          historyFlag: { flag: true, route: '/' },
        });
      }
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
        onChange={(e) => {
          setNewUser({ ...NewUser, email: e.target.value });
        }}
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
        type="text"
        id="standard-full-width"
        label="User Name"
        onChange={(e) => {
          setNewUser({ ...NewUser, username: e.target.value });
        }}
        style={{ margin: 8, marginTop: 20 }}
        placeholder="ali , ahmad , mosab..etc"
        fullWidth
        margin="normal"
        // helperText={ali}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Divider className={classes.Divider} variant="inset" />
      <TextField
        type="password"
        id="standard-full-width"
        label="password"
        onChange={(e) => {
          setNewUser({ ...NewUser, password: e.target.value });
        }}
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
      <TextField
        type="number"
        id="standard-full-width"
        label="Phone Number"
        onChange={(e) => {
          setNewUser({ ...NewUser, phoneNumber: e.target.value });
        }}
        style={{ margin: 8, marginTop: 20 }}
        placeholder="07XXXXXXXXX"
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
        onClick={(_) => registerNewAdmin()}
        className={classes.Button}
        variant="contained"
        color="primary"
        fullWidth
      >
        Register
      </Button>

      <Typography variant="body1" className={classes.text}>
        Already have an Account ?
        <Link href="/" className={classes.textLink}>
          {' '}
          Login
        </Link>
      </Typography>

      {/* alert */}
      {showAlertObj.renderAlert ? (
        <AlertDialog
          showAlertObj={showAlertObj}
          setShowAlertObj={setShowAlertObj}
        />
      ) : null}
    </div>
  );
}

// username: { type: String, required: true },
// email: { type: String, required: true, unique: true },
// password: { type: String, required: true },
// phoneNumber: { type: String, required: true },

// });
