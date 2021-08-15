/*
* Reducer for alert.
*/


// Import Dependecies
import { SET_ALERT, REMOVE_ALERT } from '../actions/alerts';

// Initial State
const initialState = [];

// Alert Reducer
const reducer = (state = initialState, action) => {

  // destructor Action
  const { type, payload } = action;

  // Defince types action
  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);

    default:
      return state;
  }
};

export default reducer;
