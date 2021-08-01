/*
* Action generators for Device reducer.
*/

import axios from '../../axios';
import {
    LOAD_DEVICES,
    LOAD_DEVICES_FAILED,
    LOAD_DEVICES_SUCCESSFULL
} from '../types/device';
import { setAlert } from './alerts';
import { createConfig } from './utils';

export const loadLiveDevices = () => (dispatch) => {

    // Dispatch LOAD_DEVICES
    dispatch({
        type: LOAD_DEVICES
    })

    // get token from localstorage
    const token = localStorage.getItem('openmf_token')

    // validate token
    if(!token) {

        // Dispatch failure action
        dispatch({
            type: LOAD_DEVICES_FAILED,
            payload: {
                error: 'You are not authorized, Please Login Again.'
            }
        })

        // Set alert
        dispatch(setAlert('You are not authorized, Please Login Again.'))

        // return from this action function
        return
    }

    //if token exists, create config header
    const config = createConfig(token)

    // send request to server
    axios.get('/extraction/list_devices', config)
        .then((res) => {

            // Dispatch successfull action
            dispatch({
                type: LOAD_DEVICES_SUCCESSFULL,
                payload: {
                    devices: res.data
                }
            })

        })

        .catch((err) => {

            // Dispatch failure action
            dispatch({
                type: LOAD_DEVICES_FAILED,
                payload: {
                    error: 'Something went wrong. Please Try Again Later.'
                }
            })

            // set alert
            dispatch(setAlert("Something went wrong, can't display live devices."))
        })
}