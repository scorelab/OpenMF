/*
    Action and Action generators for Case Reducer.
*/

import { LOAD_CASE_TREE, LOAD_CASE_TREE_FAILED, LOAD_CASE_TREE_SUCCESSFULL } from "../types/case";
import { setAlert } from "./alerts";
import axios from '../../axios';



// Action generator for Loading csae tree
export const loadCaseTree = (case_name) => (dispatch) => {

    // dispatch laod case
    dispatch({
        type: LOAD_CASE_TREE
    })

    // Create request data body
    const data = {
        case_name: case_name
    }

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
      dispatch({ type: LOAD_CASE_TREE_FAILED })
      dispatch(setAlert('Please Log In.'))
      return
    }

    // Send request to server
    axios.post('/case/case-tree', data, config)
        .then((res) => {
            const case_tree_json = JSON.parse(res.data.tree)
            dispatch({
                type: LOAD_CASE_TREE_SUCCESSFULL,
                payload: {
                  tree: case_tree_json
                }
            })
            dispatch(setAlert(res.data.message, 'success'))
        })
        .catch((err) => {
            const res = err.response

            // check err status code
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

            // FOr unknown reason
            dispatch({
              type: LOAD_CASE_TREE_FAILED,
              payload: {
                error: 'Something went wrong.'
              }
            })

            // dispatch alert
            dispatch(setAlert('Something went wrong.'))
        })

}