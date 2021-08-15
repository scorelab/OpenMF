/*
* Action Generator for alerts.
*/

// Import Depecdencies
import { v4 as uuid } from 'uuid';

// Types for alert Reducer
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';


// Alert Action Generator
// @params -
// 1. msg - message to show in alert
// 2. type - 'error' || 'success' || 'info' || 'warning'
// 3. duration - Duration for which alert would be shown
export const setAlert = (msg, type = 'error', duration = 3000) => dispatch => {

  // Create Unique ID
  const id = uuid();

  // Dispatch SetAlert
  dispatch({ type: SET_ALERT, payload: { id, msg, type, duration } });

  // To remove alert after specified duration
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), duration);

};
