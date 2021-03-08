import axios from '../../axios';
import { setAlert } from './alerts';

export const EXTRACT_DATA = 'EXTRACT_DATA';
export const SELECT_DEVICE = 'SELECT_DEVICE';
export const FETCH_DEVICES = 'FETCH_DEVICES';
export const TOGGLE_EXTRACTION_LOADING = 'TOGGLE_EXTRACTION_LOADING';

export const selectDevice = device => dispatch => {
  dispatch({ type: SELECT_DEVICE, payload: device });
};

export const fetchLiveDevices = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_EXTRACTION_LOADING, payload: true });
    const res = await axios.get('/extraction/list_devices');
    const devices = res.data;
    dispatch({ type: FETCH_DEVICES, payload: devices });
  } catch (error) {
    dispatch({ type: TOGGLE_EXTRACTION_LOADING, payload: false });
    dispatch(setAlert(error.response, 'danger'));
  }
};

export const extractData = (config, callback) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_EXTRACTION_LOADING, payload: true });
    const res = await axios.post('/extraction/extract_data', config);
    const message = res.data.message;
    dispatch({ type: EXTRACT_DATA });
    dispatch(setAlert(message, 'success'));
    callback();
  } catch (error) {
    dispatch({ type: TOGGLE_EXTRACTION_LOADING, payload: false });
    dispatch(setAlert(error.response, 'danger'));
    callback();
  }
};
