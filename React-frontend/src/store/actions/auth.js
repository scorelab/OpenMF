import axios from '../../axios';
import { setAlert } from './alerts';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';

export const login = loginData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const res = await axios.post('/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = res.data.token;
    localStorage.setItem('openmf-token', token);
    const user = await fetchProfle(token);
    dispatch({ type: LOGIN, payload: { user, token } });
  } catch (error) {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
    dispatch(setAlert('Server error', 'danger'));
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('openmf-token');
  dispatch({ type: LOGOUT });
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const token = localStorage.getItem('openmf-token');
    if (!token) {
      dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
      return;
    } else {
      const profile = await fetchProfle(token);
      dispatch({ type: AUTHENTICATE, payload: profile });
    }
  } catch (error) {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
  }
};

const fetchProfle = async token => {
  const res = await axios.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const profile = res.data;
  return profile;
};
