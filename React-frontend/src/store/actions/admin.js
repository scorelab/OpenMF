import axios from '../../axios';
import { setAlert } from './alerts';
import {
    FETCH_MEMBERS,
    FETCH_MEMBERS_SUCCESSFULL,
    FETCH_MEMBERS_FAILED,
    SELECT_USER,
    MEMBER_DELETE,
    MEMBER_DELETE_FAILED,
    MEMBER_DELETE_SUCCESSFULL
} from '../types/admin';


// Action generator for fetching members
export const fetchMembers = () => (dispatch, getState) => {
    // dispatch FETCH_MEMBER
    dispatch({
        type: FETCH_MEMBERS
    })

    // Check if admin is authenticated
    if(getState().auth && getState().auth.isAuthenticated){

        // Get token from localstorage
        const token = localStorage.getItem('openmf_token')

        // add headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // If token available add to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            dispatch({ type: FETCH_MEMBERS_FAILED })
            return
        }

        // Send request to "/user/all-users' route
        axios.get('/user/all-users', config)
            .then((res) => {
                dispatch({
                    type: FETCH_MEMBERS_SUCCESSFULL,
                    payload: {
                        extractors: res.data.extractor_members,
                        managements: res.data.management_members
                    }
                })
            })
            .catch((err) => {
                // If member fetching fails
                dispatch({
                    type: FETCH_MEMBERS_FAILED,
                    payload: {
                        error: err.message
                    }
                })
                dispatch(setAlert(err.message))
            })

    }

    // If admin not authenticated
    else{
        dispatch({
            type: FETCH_MEMBERS_FAILED,
            payload: {error: 'User Not Authenticated.'}
        })
    }
}

export const selectUser = (user) => (dispatch, getState) => {
    dispatch({
        type: SELECT_USER,
        payload: {user: user}
    })
}


// action generator to delete a member
export const deleteMember = (email, history) => (dispatch) => {

    // start member deletion process
    dispatch({
        type: MEMBER_DELETE
    })

    // request body
    const body = {
        email: email
    }

    // request headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get jwt token from localstorage
    const token = localStorage.getItem('openmf_token')

    // If token available add to headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        dispatch({ type: MEMBER_DELETE_FAILED })
        return
    }

    // send delete request to route
    // '/user/delete-user'
    axios.post('/user/delete-user', body,config)
        .then((res) => {
            history.push('/list-members')
            dispatch({
                type: MEMBER_DELETE_SUCCESSFULL,
            })
            dispatch(setAlert('Member Deleted Successfully!','success'))
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: MEMBER_DELETE_FAILED,
                payload: {
                    error: err.message
                }
            })
        })
}