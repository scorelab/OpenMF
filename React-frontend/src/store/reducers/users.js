/*
* user Reducer.
*/


// Import types.
import {
  FETCH_USERS,
  TOGGLE_USERS_LOADING,
  SET_SELECTED_USER,
} from '../actions/users';


// Initial State
const initialState = {
  isLoading: false,
  users: [],
  selectedUser: null,
};


// user reducer.
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: payload,
      };
    case TOGGLE_USERS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default reducer;
