/*
* Action generators for Extract reducer.
*/

import axios from '../../axios';
import { EXTRACT_DATA, EXTRACT_DATA_SUCCESSFULL, EXTRACT_DATE_FAILED, SET_DEFAULT_EXTRACT_DATA } from '../types/extract'
import { setAlert } from './alerts'
import { createConfig } from './utils'


// Action generator to set default state
export const defaultState = (model) => (dispatch) => {
    dispatch({
        type: SET_DEFAULT_EXTRACT_DATA,
        payload: {
            deviceID: model
        }
    })
}


// Action Generator to Extract Data
export const extractData = (deviceID, caseName, dataType, tags, history, callback) => (dispatch) => {

    // dispatch extract data
    dispatch({
        type: EXTRACT_DATA
    })

    // create data body
    const body = {
        device_id: deviceID,
        case_name: caseName,
        data: dataType,
        tags: tags
    }

    // get token
    const token = localStorage.getItem('openmf_token')

    // check validity of token
    if(!token) {

        // dispatch failure action
        dispatch({
            type: EXTRACT_DATE_FAILED,
            payload: {
                error: 'You are not authorized, Please login again.'
            }
        })

        // set alert
        dispatch(setAlert('You are not authorized, Please login again.'))

        // return
        return
    }

    // create config object
    const config = createConfig(token)

    // Send POST request to server
    axios.post('extraction/extract_data', body, config)
        .then((res) => {

            // dispatch successfull action
            dispatch({
                type: EXTRACT_DATA_SUCCESSFULL,
                payload: {
                    success: res.data.message
                }
            })

            // dispatch set alert
            dispatch(setAlert(res.data.message, 'success'))

            // call callback
            callback(false)
        })
        .catch((err) => {
            const res = err.response

            if(res && (res.status === 422 || res.status === 501 || res.status === 400 || res.status === 404)) {

                // dispatch failure action
                dispatch({
                    type: EXTRACT_DATE_FAILED,
                    payload: {
                        error: res.data.message
                    }
                })

                // setALert
                dispatch(setAlert(res.data.message))

                // return
                return
            }

            // For unknown reason failure
            dispatch({
                type: EXTRACT_DATE_FAILED,
                payload: {
                    error: 'Something went wrong. Try again.'
                }
            })

            // setAlert
            dispatch(setAlert('Something went wrong. Try again.'))
        })
}