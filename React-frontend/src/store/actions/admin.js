/*
    Action generator for admin reducer.
*/

import axios from '../../axios';
import { setAlert } from './alerts';
import {
    FETCH_MEMBERS,
    FETCH_MEMBERS_SUCCESSFULL,
    FETCH_MEMBERS_FAILED,
    SELECT_USER,
    MEMBER_DELETE,
    MEMBER_DELETE_FAILED,
    MEMBER_DELETE_SUCCESSFULL,
    MEMBER_ADD,
    MEMBER_ADD_SUCCESSFULL,
    MEMBER_ADD_FAILED,
    MEMBER_ROLE_UPDATE,
    MEMBER_ROLE_UPDATE_FAILED,
    MEMBER_ROLE_UPDATE_SUCCESSFULL,
    TASK_CREATE_FAILED,
    TASK_CREATE,
    TASK_CREATE_SUCCESSFULL,
    TASK_FETCH,
    TASK_FETCH_FAILED,
    TASK_FETCH_SUCCESSFULL,
    TASK_UPDATE,
    TASK_UPDATE_FAILED,
    TASK_UPDATE_SUCCESSFULL
} from '../types/admin';


// Action generator for fetching members
export const fetchMembers = () => (dispatch, getState) => {
    // dispatch FETCH_MEMBER
    dispatch({
        type: FETCH_MEMBERS
    })

    // Check if admin is authenticated
    if (getState().auth && getState().auth.isAuthenticated) {

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
    else {
        dispatch({
            type: FETCH_MEMBERS_FAILED,
            payload: { error: 'User Not Authenticated.' }
        })
    }
}

export const selectUser = (user) => (dispatch, getState) => {
    dispatch({
        type: SELECT_USER,
        payload: { user: user }
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
        history.push('/')
        dispatch({ type: MEMBER_DELETE_FAILED })
        return
    }

    // send delete request to route
    // '/user/delete-user'
    axios.post('/user/delete-user', body, config)
        .then((res) => {
            history.push('/list-members')
            dispatch({
                type: MEMBER_DELETE_SUCCESSFULL,
            })
            dispatch(setAlert('Member Deleted Successfully!', 'success'))
        })
        .catch((err) => {
            const res = err.response
            if (res.status === 401 || res.status === 422 || res.status === 501 || res.status === 403) {
                dispatch({
                    type: MEMBER_DELETE_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch(setAlert('Something went wrong.'))
        })
}




// action generator to add a member
export const addMember = (name, email, role, password, history) => (dispatch) => {

    // start member add process
    dispatch({
        type: MEMBER_ADD
    })

    // request body
    const body = {
        name: name,
        email: email,
        password: password,
        role: role
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
        history.push('/')
        dispatch({ type: MEMBER_DELETE_FAILED })
        return
    }

    // send post request to route
    // '/user/add-user'
    axios.post('/user/add-user', body, config)
        .then((res) => {

            // fetch updated members
            dispatch(fetchMembers())

            // change route
            history.push('/list-members')

            // dispatch succcessfull reducer
            dispatch({
                type: MEMBER_ADD_SUCCESSFULL,
            })

            // dispatch successfull alert
            dispatch(setAlert('Member Added Successfully!', 'success'))
        })
        .catch((err) => {
            const res = err.response
            if (res && (res.status === 401 || res.status === 422 || res.status === 501 || res.status === 403)) {
                dispatch({
                    type: MEMBER_ADD_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
                return
            }
            dispatch(setAlert('Something went wrong.'))
        })
}



// Action generator for role
// update of a member
export const updateRole = (email, new_role, password, history) => (dispatch) => {

    // dispatch role update
    dispatch({
        type: MEMBER_ROLE_UPDATE
    })

    // request body
    const body = {
        email: email,
        new_role: new_role,
        password: password
    }

    // config headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // get token from localstorage
    const token = localStorage.getItem('openmf_token')

    // check for token and add to config
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        history.push('/')
        dispatch(setAlert('Please log in.'))
        dispatch({
            type: MEMBER_ROLE_UPDATE_FAILED,
            error: 'UNAUTHORIZED'
        })
    }

    // send role update request to server
    axios.put('user/role-update', body, config)
        .then((res) => {
            history.push('/list-members')
            dispatch({
                type: MEMBER_ROLE_UPDATE_SUCCESSFULL,
            })
            dispatch(setAlert('Role Updated Successfully!', 'success'))
        })
        .catch((err) => {
            const res = err.response
            if (res.status === 401 || res.status === 422 || res.status === 501 || res.status === 403) {
                dispatch({
                    type: MEMBER_ROLE_UPDATE_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch(setAlert('Something went wrong.'))
        })
}


// Action generator for create task
export const createTask = (title, description, role, memberEmail, history) => (dispatch) => {

    // task create
    dispatch({
        type: TASK_CREATE
    })

    // create request body
    const body = {
        title: title,
        description: description
    }

    // assign email according to role
    if (role === 'extractor') {
        body.extractor_email = memberEmail
        body.management_email = "none"
    } else if (role === 'management') {
        body.management_email = memberEmail
        body.extractor_email = "none"
    }

    // create request header config
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get jwt token and attach with config
    const token = localStorage.getItem('openmf_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        dispatch({
            type: TASK_CREATE_FAILED,
            payload: {
                error: 'Unauthorized, Please logged in.'
            }
        })
        return
    }

    // send create request to server
    axios.post('task/create', body, config)
        .then((res) => {
            history.push('/task/list')
            dispatch({ type: TASK_CREATE_SUCCESSFULL })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response
            if (res.status === 401 || res.status === 422 || res.status === 501 || res.status === 403) {
                dispatch({
                    type: TASK_CREATE_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
                return
            }
            dispatch(setAlert('Something went wrong.'))
        })
}


// Action to update task as completed
export const updateTask = (task_id, is_completed, history) => (dispatch) => {
    // dispatch task update
    dispatch({
        type: TASK_UPDATE
    })

    // create request body
    const body = {
        task_id: task_id,
        is_completed: is_completed
    }

    // create request header config
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get jwt token and attach with config
    const token = localStorage.getItem('openmf_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    else {
        dispatch({
            type: TASK_UPDATE_FAILED,
            payload: {
                error: 'Unauthorized, Please logged in.'
            }
        })
        return
    }

    // send update request to server
    (!is_completed ? (
        axios.put(`task/mark-complete/${task_id}`, body, config)
            .then((res) => {
                history.push('/task/list')
                dispatch({ type: TASK_UPDATE_SUCCESSFULL })
                dispatch(setAlert(res.data.message, 'success'))
            }
            )
            .catch((err) => {
                const res = err.response
                if (res.status === 401 || res.status === 422 || res.status === 501 || res.status === 403) {
                    dispatch({
                        type: TASK_UPDATE_FAILED,
                        payload: {
                            error: res.data.message
                        }
                    })
                    dispatch(setAlert(res.data.message))
                    console.log(err);
                }
                dispatch(setAlert('Something went wrong.'))
            }
            )

    ) : (
        axios.put(`task/mark-incomplete/${task_id}`, body, config)
            .then((res) => {
                history.push('/task/list')
                dispatch({ type: TASK_UPDATE_SUCCESSFULL })
                dispatch(setAlert(res.data.message, 'success'))
            }
            )
            .catch((err) => {
                const res = err.response
                if (res.status === 401 || res.status === 422 || res.status === 501 || res.status === 403) {
                    dispatch({
                        type: TASK_UPDATE_FAILED,
                        payload: {
                            error: res.data.message
                        }
                    })
                    dispatch(setAlert(res.data.message))
                    console.log(err);
                }
                dispatch(setAlert('Something went wrong.'))
            }
            )
    ))
}

// Action generator for fetch task
export const fetchTasks = () => (dispatch) => {

    // task create
    dispatch({
        type: TASK_FETCH
    })

    // create request header config
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get jwt token and attach with config
    const token = localStorage.getItem('openmf_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        dispatch({
            type: TASK_FETCH_FAILED,
            payload: {
                error: 'Unauthorized, Please logged in.'
            }
        })
        return
    }

    // send get request to server
    axios.get('/task/assigned-tasks', config)
        .then((res) => {
            dispatch({
                type: TASK_FETCH_SUCCESSFULL,
                payload: { tasks: res.data.tasks }
            })
            return
        })
        .catch((err) => {
            dispatch({
                type: TASK_FETCH_FAILED,
                payload: {
                    error: err.message
                }
            })
            dispatch(setAlert(err.message))
        })
}