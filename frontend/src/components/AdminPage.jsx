import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import cookie from 'react-cookies';
import {
  Button,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import ListComponent from './ListComponent';
import AlertDialog from './Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#60ac45',
  },
  formContainer: {
    height: 800,
    background: '#f2f3f5',
    flex: 1,
  },
  itemsContainer: {
    background: '#f2f3f5',
    height: 800,
    flex: 2,
  },
  Button: {
    background: '#24aeb1',
  },
  INNERContainer: {
    paddingTop: 50,
  },
}));
export default function AdminPage() {
  const classes = useStyles();
  const [myForm, setForm] = useState({
    MedicinalRecipe: true,
    type: 'Liquid',
    title: '',
    amount: 0,
    descriptions: '',
    price: 0,
    poster: '',
    imageUrl: '',
  });
  const [medicine, setMedicine] = useState([]);
  const [showAlertObj, setShowAlertObj] = useState({ renderAlert: false });

  async function getData() {
    try {
      const response = await axios.get(
        'https://pharmacyleaf.herokuapp.com/api/users/Medicine'
      );
      setMedicine(response.data);
    } catch (error) {
      console.log(error);
      setShowAlertObj({
        renderAlert: true,
        title: 'there are error?',
        message: "couldn't GET the data   ",
        flag: true,
        historyFlag: { flag: false, route: '' },
      });
    }
  }
  useEffect(() => {
    getData();
  }, []);

  async function postMedicine() {
    try {
      const token = cookie.load('token');
      await axios.post(
        'https://pharmacyleaf.herokuapp.com/api/users/Medicine',
        myForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowAlertObj({
        renderAlert: true,
        title: 'you post successfully?',
        message: ' ..',
        flag: true,
        historyFlag: { flag: false, route: '' },
      });
      getData();
    } catch (error) {
      console.log(error);
      setShowAlertObj({
        renderAlert: true,
        title: 'there are error?',
        message: "we couldn't send the data to the server  ",
        flag: true,
        historyFlag: { flag: false, route: '' },
      });
    }
  }

  return (
    <div className={classes.root}>
      {/* alert */}
      {showAlertObj.renderAlert ? (
        <AlertDialog
          showAlertObj={showAlertObj}
          setShowAlertObj={setShowAlertObj}
        />
      ) : null}
      <div className={classes.formContainer}>
        <div className={classes.INNERContainer}>
          <Typography variant="h5">Add Medicine</Typography>

          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              Medicine Title
            </InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={myForm.title}
              onChange={(event) =>
                setForm({ ...myForm, title: event.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              Medicine Amount
            </InputLabel>
            <FilledInput
              type="number"
              id="filled-adornment-amount"
              value={myForm.amount}
              onChange={(event) =>
                setForm({ ...myForm, amount: event.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              Medicine price
            </InputLabel>
            <FilledInput
              type="number"
              id="filled-adornment-amount"
              value={myForm.price}
              onChange={(event) =>
                setForm({ ...myForm, price: event.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              Poster Name
            </InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={myForm.poster}
              onChange={(event) =>
                setForm({ ...myForm, poster: event.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Image URL</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={myForm.imageUrl}
              onChange={(event) =>
                setForm({ ...myForm, imageUrl: event.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel id="label"> Medicine Type</InputLabel>
            <Select
              labelId="label"
              id="select"
              value={myForm.type}
              onChange={(event) =>
                setForm({ ...myForm, type: event.target.value })
              }
            >
              <MenuItem value="Liquid">Liquid</MenuItem>
              <MenuItem value="Tablet">Tablet</MenuItem>
              <MenuItem value="Capsules">Capsules</MenuItem>
              <MenuItem value="DropsInjections">DropsInjections</MenuItem>
              <MenuItem value="Inhalers">Inhalers</MenuItem>
              <MenuItem value="Suppositories">Suppositories</MenuItem>
              <MenuItem value="Topical medicines">Topical medicines</MenuItem>
              <MenuItem value="Implants or patches">
                Implants or patches
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="filled">
            <TextField
              multiline
              label="Medicine descriptions"
              minRows="3"
              id="filled-adornment-amount"
              value={myForm.descriptions}
              onChange={(event) =>
                setForm({ ...myForm, descriptions: event.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="filled">
            <FormLabel component="legend">Medicinal Recipe </FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              value={myForm.MedicinalRecipe}
              onChange={(event) => {
                var x = true;
                if (event.target.value === 'false') {
                  x = !myForm.MedicinalRecipe;
                }
                setForm({ ...myForm, MedicinalRecipe: x });
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={() => postMedicine()}
            className={classes.Button}
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </div>
      </div>

      {/* the list items  */}

      <div className={classes.itemsContainer}>
        <ListComponent medicine={medicine} getData={getData} />
      </div>
    </div>
  );
}
