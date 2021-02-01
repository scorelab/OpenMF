import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CustomAlert = () => {
  const alerts = useSelector(state => state.alerts);

  if (!alerts) {
    return null;
  }

  return alerts.map(alert => (
    <Alert className='m-0' key={alert.id} variant={alert.type}>
      {alert.msg}
    </Alert>
  ));
};

export default CustomAlert;
