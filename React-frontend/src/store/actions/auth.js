import axios from 'axios';
// import { setAlert } from './alerts';
import { toast } from 'react-toastify';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const loginUser = (values) => async (dispatch) => {
  try {
    const res = await axios.post('/login', { ...values, remember: 1 });
    dispatch({ type: LOGIN_USER, payload: res.data });
    console.log(res);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: null });
    toast.error(error.response.data);
    console.log(error.response);
  }
};
export const createUser = (values) => async (dispatch) => {
  try {
    const res = await axios.post('/user/create', {
      ...values,
      role: 'admin',
    });
    dispatch({ type: REGISTER_USER, payload: res.data });
    console.log(res);
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: null });
    toast.error(error.response.data);
    console.log(error.response);
  }
};
