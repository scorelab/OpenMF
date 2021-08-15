/*
* Auth Reducer.
*/


// Import types
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
  LOGOUT_FAILED,
  FORGOT_PASSWORD_SEND_LINK,
  FORGOT_PASSWORD_SEND_LINK_SUCCESSFULL,
  FORGOT_PASSWORD_SEND_LINK_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESSFULL,
  EMAIL_VERIFY_SEND_LINK,
  EMAIL_VERIFY_SEND_LINK_FAILED,
  EMAIL_VERIFY_SEND_LINK_SUCCESSFULLY,
  VERIFY_EMAIL,
  VERIFY_EMAIL_FAILED,
  VERIFY_EMAIL_SUCCESSFULLY
} from '../types/auth';


// Initial State for auth redcuer
const initialState = {
  isRegistered: false,
  isAuthenticated: false,
  isLoading: false,
  isSendingLink: false,
  isResettingPassword: false,
  isVerified: false,
  isVerifing: false,
  auth_token: '',
  user: null,
  error: ''
};


// Auth Reudcer.
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
        isRegistered: true,
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
        isRegistered: true,
        user: payload.data.user
      }

    case USER_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
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

    case FORGOT_PASSWORD_SEND_LINK:
    case EMAIL_VERIFY_SEND_LINK:
      return {
        ...state,
        isSendingLink: true
      }

    case FORGOT_PASSWORD_SEND_LINK_SUCCESSFULL:
    case FORGOT_PASSWORD_SEND_LINK_FAILED:
    case EMAIL_VERIFY_SEND_LINK_FAILED:
    case EMAIL_VERIFY_SEND_LINK_SUCCESSFULLY:
      return {
        ...state,
        isSendingLink: false,
      }

    case RESET_PASSWORD:
      return {
        ...state,
        isResettingPassword: true
      }

    case RESET_PASSWORD_FAILED:
    case RESET_PASSWORD_SUCCESSFULL:
      return {
        ...state,
        isResettingPassword: false
      }

    case VERIFY_EMAIL:
      return {
        ...state,
        isVerifing: true,
      }

    case VERIFY_EMAIL_FAILED:
      return {
        ...state,
        isVerifing: false,
        isVerified: false
      }

    case VERIFY_EMAIL_SUCCESSFULLY:
      return {
        ...state,
        isVerified: true,
        isVerifing: false,
      }

    default:
      return state;
  }
};

export default reducer;
