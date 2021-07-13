import { v4 as uuid } from 'uuid';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const setAlert = (msg, type = 'error', duration = 3000) => dispatch => {
  const id = uuid();
  // To add this alert to list of alerts
  // type determines color of the alert message
  // duration determines how long the alert will be shown
  dispatch({ type: SET_ALERT, payload: { id, msg, type, duration } });
  // To remove alert after specified duration
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), duration);
};
