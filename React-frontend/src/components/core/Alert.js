/*
* Component for displaying Alert.
*/

// Import Dependecies
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';


// Custom Styles
const useStyle = makeStyles((theme) => ({
  alert: {
    position: 'fixed',
    minWidth: '80vh',
    zIndex: 9999,
    right: theme.spacing(2),
    top: '10vh',
  }
}))

const CustomAlert = () => {

  // getting alert state from alert reducer
  const alerts = useSelector(state => state.alerts);

  // Invoking custom styles
  const classes = useStyle()

  // check for alerts
  if (!alerts) {
    return null;
  }

  // Iterate and represent alerts
  return alerts.map(alert => (
    <Alert severity={alert.type} key={alert.id} className={classes.alert}>
      {alert.msg}
    </Alert>
  ));
};

export default CustomAlert;
