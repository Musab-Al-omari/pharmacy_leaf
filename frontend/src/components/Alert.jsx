import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router';

export default function AlertDialog({ showAlertObj, setShowAlertObj }) {
  const history = useHistory('');
  const handleCloseAsAgree = () => {
    if (showAlertObj.historyFlag.flag) {
      history.push(`${showAlertObj.historyFlag.route}`);
    }
    setShowAlertObj({ ...showAlertObj, flag: false });
  };
  const handleCloseAsDisagree = () => {
    setShowAlertObj({ ...showAlertObj, flag: false });
  };
  return (
    <div>
      <Dialog
        open={showAlertObj.flag}
        onClose={handleCloseAsDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${showAlertObj.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${showAlertObj.message}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAsDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleCloseAsAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
