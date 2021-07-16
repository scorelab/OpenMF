/*
* Action generator for management reducer.
*/

import axios from '../../axios';
import {
    LOAD_COMPLETED_TASKS,
    LOAD_COMPLETED_TASKS_FAILED,
    LOAD_COMPLETED_TASKS_SUCCESSFULL,
    LOAD_TODO_TASKS,
    LOAD_TODO_TASKS_FAILED,
    LOAD_TODO_TASKS_SUCCESSFULL,
    LOAD_ANALYTICS_COMMON_WORD,
    LOAD_ANALYTICS_COMMON_WORD_FAILED,
    LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL
} from "../types/management"
import { setAlert } from './alerts';


// ++++++++++++++ Utility functions ++++++++++++++++++++

// function to create config object
const createConfig = (token) => {

    //// create object
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    //// return object
    return config
  }

// ++++++++++++++++++++++++++++++++++++++++++++++++





// Action generator to fetch/load completed tasks
export const loadCompletedTasks = () => (dispatch) => {

    // dispatch laod completed tasks
    dispatch({
        type: LOAD_COMPLETED_TASKS
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_COMPLETED_TASKS_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }

    // create config header object
    const config = createConfig(token)

    // send request to server
    axios.get('/task/completed-tasks', config)
        .then((res) => {
            dispatch({
                type: LOAD_COMPLETED_TASKS_SUCCESSFULL,
                payload: {
                    tasks: res.data.tasks
                }
            })
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_COMPLETED_TASKS_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
                type: LOAD_COMPLETED_TASKS_FAILED,
                payload: {
                    error: 'Something Went Wrong.'
                }
            })
            dispatch(setAlert('Something Went Wrong.'))
        })
}

// Action generator to fetch/load common words between cases
export const loadAnalyticsCommonWord = (case1, case2) => (dispatch) => {
    
    // dispatch laod analytics common word
    dispatch({
        type: LOAD_ANALYTICS_COMMON_WORD
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }
    // create config header object
    const config = createConfig(token)


    const data = {
        case1: case1,
        case2: case2
    }
    
    // send request to server
    axios.post('/common/Case1/Case2',data ,config)
        .then((res) => {
            console.log(res)
            const commonword_json = (res.data)
            
            dispatch({
                type: LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL,
                payload: {
                    commonwords: commonword_json
                }
            })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
                type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
                payload: {
                    error: 'Something Went Wrong.'
                }
            })
            dispatch(setAlert('Something Went Wrong.'))
        })
}

// Action generator to fetch/load todo tasks
export const loadTodoTasks = () => (dispatch) => {

    // dispatch laod completed tasks
    dispatch({
        type: LOAD_TODO_TASKS
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_TODO_TASKS_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }

    // create config header object
    const config = createConfig(token)

    // send request to server
    axios.get('/task/todo-tasks', config)
        .then((res) => {
            dispatch({
                type: LOAD_TODO_TASKS_SUCCESSFULL,
                payload: {
                    tasks: res.data.tasks
                }
            })
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_TODO_TASKS_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
                type: LOAD_TODO_TASKS_FAILED,
                payload: {
                    error: 'Something Went Wrong.'
                }
            })
            dispatch(setAlert('Something Went Wrong.'))
        })
}