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
    LOAD_REPORT_GENERAL_INFO,
    LOAD_REPORT_GENERAL_INFO_FAILED,
    LOAD_REPORT_GENERAL_INFO_SUCCESSFUL
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

// Action generator to fetch/load general info to show in report section
export const loadAnalyticsCommonWord = (case_name) => (dispatch) => {

    // dispatch laod report data
    dispatch({
        type: LOAD_REPORT_GENERAL_INFO
    })

    // Get jwt token from local Storage
    const token = localStorage.getItem('openmf_token')

    // check if token exists or not
    if(!token){
        dispatch({
            type: LOAD_REPORT_GENERAL_INFO_FAILED,
            payload: {
                error: 'Unauthorized, Please Login Again.'
            }
        })
        return
    }
    // create config header object
    const config = createConfig(token)


    const data = {
        case_name: case_name
    }

    // send request to server
    axios.post('/report/generalinfo',data ,config)
        .then((res) => {

            const info_data = (res.data)
            console.log(info_data, "  infodata from action")
            dispatch({
                type: LOAD_REPORT_GENERAL_INFO_SUCCESSFUL,
                payload: {
                    generalinfo: info_data
                }
            })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response
            if(res && (res.status === 404 || res.status === 500 || res.status === 403)){
                dispatch({
                    type: LOAD_REPORT_GENERAL_INFO_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }
            dispatch({
              type: LOAD_REPORT_GENERAL_INFO_FAILED,
              payload: {
                error: "Something Went Wrong.",
              },
            });
            dispatch(setAlert('Something Went Wrong.'))
        })
}
