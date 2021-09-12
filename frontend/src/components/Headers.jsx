import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import image from '../assets/large_pharmacyleaf.png';
import { Link } from '@material-ui/core';
import { useAuth } from '../provider/AuthProvider';
import cookie from 'react-cookies';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  Toolbar: {
    background: '#24aeb1',
  },
  price: {
    width: '100%',
    height: '25px',
    background: '#60ac45',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  mainBarImage: {
    width: 'auto',
    height: '50px',
  },
  imageBackground: {
    background: 'white',
    borderRadius: '50%',
    borderColor: '#60ac45 ',
    border: 'solid 3px',
  },
  link: {
    display: 'flex',
    gap: 20,
  },
}));
export default function Headers() {
  // #24aeb1      36  174   177   sky blue
  // #60ac45       96   172   69  green
  // #f2f3f5        242  243  245 background grey
  const { auth, setAuth } = useAuth();
  const classes = useStyles();
  return (
    <AppBar position="static">
      <div className={classes.price}>
        <div className={classes.text}>free shipping for all order of 99 $</div>
      </div>
      <Toolbar className={classes.Toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <div className={classes.imageBackground}>
            <img
              src={image}
              className={classes.mainBarImage}
              alt="src/assets/gmail.png"
            />
          </div>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Welcome into Pharmacy Leaf
        </Typography>
        <div className={classes.link}>
          <Link href="/MainProducts" variant="h6" color="inherit">
            Main Products
          </Link>

          {auth ? (
            <div className={classes.link}>
              <Link
                href="/"
                variant="h6"
                color="inherit"
                onClick={() => {
                  cookie.remove('token');
                  setAuth(null);
                }}
              >
                Logout As Admin
              </Link>
            </div>
          ) : (
            <div className={classes.link}>
              <Link href="/" variant="h6" color="inherit">
                Login As Admin
              </Link>

              <Link href="/Register" variant="h6" color="inherit">
                Register As Admin
              </Link>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
