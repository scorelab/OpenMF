import axios from '../../axios';
import { setAlert } from './alerts';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';

export const login = loginData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    await axios.post('/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: LOGIN, payload: loginData });
  } catch (error) {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
    dispatch(setAlert('Server error', 'danger'));
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
