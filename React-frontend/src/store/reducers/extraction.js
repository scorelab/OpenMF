import {
  EXTRACT_DATA,
  SELECT_DEVICE,
  FETCH_DEVICES,
  TOGGLE_EXTRACTION_LOADING,
} from '../actions/extraction';

const initialState = {
  devices: [],
  isLoading: false,
  currentDevice: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case EXTRACT_DATA:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_DEVICES:
      return {
        ...state,
        devices: payload,
        isLoading: false,
      };
    case SELECT_DEVICE:
      return {
        ...state,
        currentDevice: payload,
      };
    case TOGGLE_EXTRACTION_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default reducer;
