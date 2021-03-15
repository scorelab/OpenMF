import {
  FETCH_USERS,
  TOGGLE_USERS_LOADING,
  SET_SELECTED_USER,
  FILTER_USERS,
} from '../actions/users';

const initialState = {
  isLoading: false,
  users: [],
  filteredUsers: [],
  selectedUser: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: false,
        users: payload,
        filteredUsers: payload,
      };
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: payload,
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
