import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESSFULL,
  SIGNUP_PROCESS,
  AUTH_DEFAULT,
  LOGIN_PROCESS,
  LOGIN_SUCCESSFULL,
  LOGIN_FAILED,
  USER_LOADING,
  USER_LOADED,
  USER_LOAD_ERROR,
  LOGOUT_PROCESS,
  LOGOUT,
  LOGOUT_FAILED
} from '../types/auth';

const initialState = {
  isRegistered: false,
  isAuthenticated: false,
  isLoading: false,
  auth_token: '',
  user: null,
  error: ''
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_DEFAULT:
      return {
        ...state,
        isLoading: false,
        isRegistered: false,
        error: ''
      }

    case SIGNUP_PROCESS:
      return {
        ...state,
        isLoading: true
      }

    case SIGNUP_SUCCESSFULL:
      return {
        ...state,
        isLoading: false,
        isRegistered: true
      }

    case SIGNUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isRegistered: false,
        error: payload.data
      }

    case LOGIN_PROCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true
      };

    case LOGIN_SUCCESSFULL:
      localStorage.setItem('openmf_token', action.payload.data.auth_token)
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        auth_token: payload.data.auth_token,
        error: ''
      }

    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: payload.data,
        user: null
      }

    case USER_LOADING:
      return{
        ...state,
        isLoading: true
      }

    case USER_LOADED:
      return{
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: payload.data.user
      }

    case USER_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
      }

    case LOGOUT_PROCESS:
      return {
        ...state,
        isLoading: true,
      }

    case LOGOUT:
      localStorage.removeItem('openmf_token')
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };


    case LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.data.error
      }

    default:
      return state;
  }
};

export default reducer;
