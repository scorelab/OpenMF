import { FETCH_STATS, TOGGLE_STATS_LOADING } from '../actions/stats';

const initialState = {
  usersCount: null,
  casesCount: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_STATS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case TOGGLE_STATS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default reducer;
