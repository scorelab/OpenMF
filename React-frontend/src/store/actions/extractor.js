// Action generators for extractor reducer

import axios from '../../axios';
import {
FETCH_EXTRACTED_CASES,
FETCH_EXTRACTED_CASES_FAILED,
FETCH_EXTRACTED_CASES_SUCCESSFULL} from "../types/extractor";
import { setAlert } from './alerts';



// Action generator for fetching extracted cases
export const fetch_extracted_cases = (extractor_email) => (dispatch) => {

    // fetch extracted cases
    dispatch({
        type: FETCH_EXTRACTED_CASES,
    })

    // Request Body
    const body = {
        email: extractor_email
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
        dispatch({ type: FETCH_EXTRACTED_CASES_FAILED, payload:{error: "Unauthorized, please log in again."}})
        return
    }

    // Send request to server for getting
    // extracted cases using extrator id
    axios.post('/user/extracted-cases', body, config)
        .then((res) => {

            // successfull response
            if(res.status === 200){
                dispatch({
                    type: FETCH_EXTRACTED_CASES_SUCCESSFULL,
                    payload: {
                        extracted_cases: res.data.extracted_cases
                    }
                })
            }
        })
        .catch(err => {

            // Error response
            const res = err.response
            console.log(err.message)
            if(res.data && (res.status === 404 || res.status === 409 || res.status === 401)){
                dispatch({
                    type: FETCH_EXTRACTED_CASES_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })
                dispatch(setAlert(res.data.message))
            }

            // For unknown error
            dispatch({
                type: FETCH_EXTRACTED_CASES_FAILED,
                payload: {
                    error: 'Something went wrong.'
                }
            })
            dispatch(setAlert('Something went wrong.'))
        })
}
