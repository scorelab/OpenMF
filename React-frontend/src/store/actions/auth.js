import axios from '../../axios';
import {
  AUTH_DEFAULT,
  LOGIN_FAILED,
  LOGIN_PROCESS,
  LOGIN_SUCCESSFULL,
  LOGOUT_FAILED,
  LOGOUT_PROCESS,
  SIGNUP_FAILED,
  SIGNUP_PROCESS,
  SIGNUP_SUCCESSFULL,
  USER_LOADED,
  USER_LOADING,
  USER_LOAD_ERROR
} from '../types/auth';
import { setAlert } from './alerts';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';



export const authDefault = () => dispatch => {
  dispatch({type: AUTH_DEFAULT})
};


export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING})

  // Get token from localstorage
  const token = localStorage.getItem('openmf_token')

  // add headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token available add to headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    dispatch({ type: USER_LOAD_ERROR })
    return
  }

  axios.get('/user/profile', config)
    .then(
      (res) => {
        if (res && (res.status === 200 || res.status === 201)) {
          dispatch({
            type: USER_LOADED,
            payload: {
              data: {
                user: res.data.user
              }
            }
          })
        } else if (res && (res.status >= 400 && res.status < 500)) {
          dispatch({
            type: USER_LOAD_ERROR,
            payload: {
              data: res.data.message
            }
          })
          dispatch(setAlert(res.data.message))
      }
      }
    )
    .catch((err) => {
      dispatch({
        type: USER_LOAD_ERROR,
        payload: {
          data: {error: 'UNAUTHORIZED'}
        }
      })
    })
}




export const login = (email, password, role, remember) => async dispatch => {
  // Login data
  const loginData = {
    email: email,
    password: password,
    role: role,
    remember: remember
  }

  // Config headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  dispatch({
    type: LOGIN_PROCESS,
  })
  axios.post('/login', loginData, config)
    .then((res) => {
      if(res && res.status === 200){
        dispatch({
          type: LOGIN_SUCCESSFULL,
          payload: {data: {auth_token: res.data.access_token}}
        })
        dispatch(loadUser())
        dispatch(setAlert(res.data.message, 'success'))
      }
    })
    .catch((err) => {
      const res = err.response
      if(res && (res || res.status === 404 || res.status === 406 || res.status === 409 || res.status === 401)){
        dispatch({
          type: LOGIN_FAILED,
          payload: {data: res.data.message}
        })
      }
      else{
        dispatch({
          type: LOGIN_FAILED,
          payload: {data: 'Something went wrong.'}
        })
      }
    })
};


export const signUp = (username, email, password, role, history) => (dispatch) => {
  // Body for post request
  const body = {
    name: username,
    email: email,
    password: password,
    role: role
  }

  // Request header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  dispatch({type: SIGNUP_PROCESS})
  axios.post('/user/create', body, config)
    .then((res) => {
      if(res && (res.status === 200 || res.status === 201)){
        dispatch({type: SIGNUP_SUCCESSFULL})
        dispatch(setAlert(res.data.message, 'success'))
        history.push('/')
        window.location.reload()
      }
    })
    .catch((err) => {
      var res = err.response
      if(res && (res.status === 400 || res.status === 406 || res.status === 409 || res.status === 401)){
        dispatch({type: SIGNUP_FAILED, payload: {data: res.data.message}})
      }
      else{
        dispatch({
          type: SIGNUP_FAILED,
          payload: {data: 'Something went wrong.'}
        })
      }
    })
}


export const logout = (history) => (dispatch) => {
  const token = localStorage.getItem('openmf_token')

  // headers
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  dispatch({
    type: LOGOUT_PROCESS
  })
  axios.post('/logout', {}, config)
    .then((res) => {
      if(res && res.status === 200){
        dispatch({
          type: LOGOUT
        })
        dispatch(setAlert('user logged out!','success'))
        window.location.reload()
      }
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAILED,
        payload: {
          data: {
            error: err.response.statusText
          }
        }
      })
    })
}