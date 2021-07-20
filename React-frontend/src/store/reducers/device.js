/*
* Reducer for device.
*/

import { LOAD_DEVICES, LOAD_DEVICES_FAILED, LOAD_DEVICES_SUCCESSFULL } from '../types/device';


// Initial state
const initialState = {
    isLoading: false,
    error: null,
    devices: null
}

// Reducer definition
const deviceReducer = (state = initialState, action) => {

    // Destructure action
    const { type, payload } = action

    // switch cases
    switch (type) {
        case LOAD_DEVICES:
            return {
                ...state,
                isLoading: true,
                error: null,
                devices: null,
            }

        case LOAD_DEVICES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
                devices: null
            }

        case LOAD_DEVICES_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                devices: payload.devices
            }

        default:
            return state
    }

}

export default deviceReducer