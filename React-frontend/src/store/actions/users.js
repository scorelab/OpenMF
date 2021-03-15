import store from '../store';
import axios from '../../axios';
import { setAlert } from './alerts';

export const FETCH_USERS = 'FETCH_USERS';
export const FILTER_USERS = 'FILTER_USERS';
export const SET_SELECTED_USER = 'SET_SELECTED_USER';
export const TOGGLE_USERS_LOADING = 'TOGGLE_USERS_LOADING';

export const fetchUsers = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_USERS_LOADING, payload: true });
    const res = await axios.get('/user/list');
    const users = res.data;
    dispatch({ type: FETCH_USERS, payload: users });
  } catch (error) {
    console.log(error);
    dispatch({ type: TOGGLE_USERS_LOADING, payload: false });
    dispatch(setAlert('Server error', 'danger'));
  }
};

export const addUser = (userData, callback) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_USERS_LOADING, payload: true });
    const res = await axios.post('/user/add-user', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const message = res.data;
    dispatch(setAlert(message, 'success'));
    callback();
  } catch (error) {
    console.log(error);
    dispatch({ type: TOGGLE_USERS_LOADING, payload: false });
    dispatch(setAlert(error.response.data, 'danger'));
  }
};

export const deleteUser = (email, toggleModal) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_USERS_LOADING, payload: true });
    const res = await axios.post(
      '/user/remove-user',
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const message = res.data;
    dispatch(setAlert(message, 'warning'));
    toggleModal(false);
    dispatch(fetchUsers());
  } catch (error) {
    console.log(error);
    toggleModal(false);
    dispatch({ type: TOGGLE_USERS_LOADING, payload: false });
    dispatch(setAlert(error.response.data, 'danger'));
  }
};

export const updateUserRole = (email, role, toggleModal) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_USERS_LOADING, payload: true });
    const res = await axios.post(
      '/user/role-update',
      { email, role },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const message = res.data;
    dispatch(setAlert(message, 'warning'));
    toggleModal(false);
    dispatch(fetchUsers());
  } catch (error) {
    console.log(error);
    toggleModal(false);
    dispatch({ type: TOGGLE_USERS_LOADING, payload: false });
    dispatch(setAlert(error.response.data, 'danger'));
  }
};

export const selectUser = email => dispatch => {
  dispatch({ type: SET_SELECTED_USER, payload: email });
};

export const searchUser = (query, userRole) => dispatch => {
  const users = store.getState().users.users;
  let filteredUsers;
  if (userRole === 'all' && !query) {
    // Neither searching nor filtering
    filteredUsers = users;
  } else if (userRole === 'all' && query) {
    // No filtering only searching
    filteredUsers = users.filter(
      user => user.name.startsWith(query) || user.email.startsWith(query)
    );
  } else if (userRole !== 'all' && !query) {
    // No searching only filtering
    filteredUsers = users.filter(user => user.role === userRole);
  } else {
    // Both searching and filtering
    filteredUsers = users.filter(
      user =>
        (user.name.startsWith(query) || user.email.startsWith(query)) &&
        user.role === userRole
    );
  }
  dispatch({ type: FILTER_USERS, payload: filteredUsers });
};
