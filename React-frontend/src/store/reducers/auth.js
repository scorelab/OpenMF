import {
  LOGIN,
  LOGOUT,
  TOGGLE_AUTH_LOADING,
  AUTHENTICATE,
} from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case AUTHENTICATE:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case TOGGLE_AUTH_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default reducer;
