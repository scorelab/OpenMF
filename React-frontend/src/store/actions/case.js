/*
    Action and Action generators for Case Reducer.
*/

import {
  DEFAULT_CASE_STATE,
  LOAD_CASES,
  LOAD_CASES_FAILED,
  LOAD_CASES_SUCCESSFULL,
  LOAD_CASE_TREE,
  LOAD_CASE_TREE_FAILED,
  LOAD_CASE_TREE_SUCCESSFULL,
  SELECT_CASE,
  SELECT_CASE_FAILED,
  SELECT_CASE_SUCCESSFULL
} from "../types/case";
import { setAlert } from "./alerts";
import axios from '../../axios';



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


// Action generator for default state
export const loadDefaultState = () => (dispatch) => {
  dispatch({
    type: DEFAULT_CASE_STATE
  })
}


// Action generator for Loading csae tree
export const loadCaseTree = (case_name) => (dispatch) => {

    //// dispatch laod case
    dispatch({
        type: LOAD_CASE_TREE
    })

    //// Create request data body
    const data = {
        case_name: case_name
    }

    //// Get token from localstorage
    const token = localStorage.getItem('openmf_token')

    //// add headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    //// If token available add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      dispatch({ type: LOAD_CASE_TREE_FAILED })
      dispatch(setAlert('Please Log In.'))
      return
    }

    //// Send request to server
    axios.post('/case/case-tree', data, config)
        .then((res) => {
            const case_tree_json = JSON.parse(res.data.tree)
            dispatch({
                type: LOAD_CASE_TREE_SUCCESSFULL,
                payload: {
                  tree: case_tree_json,
                  case: res.data.case
                }
            })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response

            //// check err status code
            if(res && (res.status === 404 || res.status === 422 || res.status === 500)){
              dispatch({
                type: LOAD_CASE_TREE_FAILED,
                payload: {
                  error: res.data.message
                }
              })
              dispatch(setAlert(res.data.message))
              return
            }

            //// FOr unknown reason
            dispatch({
              type: LOAD_CASE_TREE_FAILED,
              payload: {
                error: 'Something went wrong.'
              }
            })

            //// dispatch alert
            dispatch(setAlert('Something went wrong.'))
        })

}



// Action generator for load cases
export const loadCases = () => (dispatch) => {

  // cases loading
  dispatch({
      type: LOAD_CASES
  })


  // get jwt token and attach with config
  const token = localStorage.getItem('openmf_token')

  // check if token exists or not
  if(!token){
    dispatch({
        type: LOAD_CASES_FAILED,
        payload: {
            error: 'Unauthorized, Please logged in.'
        }
    })
    return
  }

  // get config object
  const config = createConfig(token)

  // send get request to server
  axios.get('/case/extracted-cases', config)
      .then((res) => {
          dispatch({
              type: LOAD_CASES_SUCCESSFULL,
              payload: {cases: res.data.cases}
          })
          return
      })
      .catch((err) => {
          dispatch({
              type: LOAD_CASES_FAILED,
              payload: {
                  error: err.message
              }
          })
          dispatch(setAlert(err.message))
      })
}


// Action Generator to select a case
export const selectCase = (caseName) => (dispatch) => {

  // Dispatch select case
  dispatch({
    type: SELECT_CASE
  })

  // Get Token from localstorage
  const token = localStorage.getItem('openmf_token')

  // Check token
  if(!token){
    dispatch({
      type: SELECT_CASE_FAILED,
      payload: {
        error: 'You are not authorized, Please Login Again.'
      }
    })
  }

  // Create Config
  const config = createConfig(token)

  // send request to server
  axios.get(`/case/get_case/${caseName}`, config)
    .then((res) => {

      // Dispatch successfull result
      dispatch({
        type: SELECT_CASE_SUCCESSFULL,
        payload: {
          case: res.data.case
        }
      })

    })

    .catch((err) => {
      console.log(err)

      // Dispatch fail result
      dispatch({
        type: SELECT_CASE_FAILED,
        payload: {
          error: "Something went wrong."
        }
      })
    })
} 