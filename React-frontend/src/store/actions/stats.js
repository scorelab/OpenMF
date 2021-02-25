import axios from '../../axios';
import { setAlert } from './alerts';

export const FETCH_STATS = 'FETCH_STATS';
export const TOGGLE_STATS_LOADING = 'TOGGLE_STATS_LOADING';

export const fetchStats = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_STATS_LOADING, payload: true });
    const usersRes = await axios.get('/user/count');
    const usersCount = usersRes.data.total_users;
    const casesRes = await axios.get('/case/count');
    const casesCount = casesRes.data.total_cases;
    dispatch({ type: FETCH_STATS, payload: { usersCount, casesCount } });
  } catch (error) {
    dispatch({ type: TOGGLE_STATS_LOADING, payload: false });
    dispatch(setAlert('Server error', 'danger'));
  }
};
