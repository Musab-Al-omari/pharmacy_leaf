import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import cookie from 'react-cookies';
import { useAuth } from '../provider/AuthProvider';
import AlertDialog from './Alert';

const useStyles = makeStyles({
  cards: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  root: {
    maxWidth: '33.2%',
  },
  flex: {
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
  },

  descriptions: {
    height: 100,
    overflow: 'auto',
  },
});

export default function ListComponent({ medicine, getData }) {
  const classes = useStyles();
  const { auth } = useAuth();
  const [showAlertObj, setShowAlertObj] = useState({ renderAlert: false });

  async function deleteItem(id) {
    try {
      const token = cookie.load('token');
      const url = `https://pharmacyleaf.herokuapp.com/api/users/Medicine/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getData();
    } catch (error) {
      console.log(error);
      setShowAlertObj({
        renderAlert: true,
        title: 'there are error?',
        message: "couldn't delete the item ",
        flag: true,
        historyFlag: { flag: false, route: '' },
      });
    }
  }

  return (
    <>
      {/* alert */}
      {showAlertObj.renderAlert ? (
        <AlertDialog
          showAlertObj={showAlertObj}
          setShowAlertObj={setShowAlertObj}
        />
      ) : null}
      <div className={classes.cards}>
        {medicine.map((obj) => (
          <Card className={classes.root} key={obj._id}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={`${obj.imageUrl}`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {`${obj.title}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.descriptions}
                >
                  {`${obj.descriptions}`}
                </Typography>
                <div className={classes.flex}>
                  <Typography variant="caption" display="inline" gutterBottom>
                    Storage: {`${obj.amount}`}
                  </Typography>
                  <Typography variant="caption" display="inline" gutterBottom>
                    Price:{`${obj.price} $`}
                  </Typography>
                </div>
                <div className={classes.flex}>
                  <Typography variant="caption" display="inline" gutterBottom>
                    Type :{`${obj.type}`}
                  </Typography>
                  <Typography variant="caption" display="inline" gutterBottom>
                    Recipe :
                    {obj.MedicinalRecipe === true ? 'Needed' : 'Not Needed'}
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
            {auth ? (
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    deleteItem(obj._id);
                  }}
                >
                  delete
                </Button>
              </CardActions>
            ) : null}
          </Card>
        ))}
      </div>
    </>
  );
}
