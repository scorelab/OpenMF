/*
* Reducer definition for extract.
*/

import {
    EXTRACT_DATA,
    EXTRACT_DATA_SUCCESSFULL,
    EXTRACT_DATE_FAILED,
    SET_DEFAULT_EXTRACT_DATA
} from '../types/extract';

// Initial state
const initialState = {
    isLoading: false,
    error: null,
    deviceID: null,
    success: null
}


// Extract reducer
const extractReducer = (state = initialState, action) => {

    // Destructuring action
    const { type, payload } = action

    // switch cases
    switch (type) {
        case EXTRACT_DATA:
            return {
                ...state,
                isLoading: true,
                error: null,
                success: null,
            }

        case SET_DEFAULT_EXTRACT_DATA:
            return {
                ...state,
                isLoading: false,
                error: null,
                success: null,
                deviceID: payload.deviceID
            }

        case EXTRACT_DATE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
                success: null
            }

        case EXTRACT_DATA_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                success: payload.success
            }

        default:
            return state
    }
}


// Exporting
export default extractReducer