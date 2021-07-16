/*
*   File reducer definition.
*/


// Types for case reducers
import {
    LOAD_FILE,
    LOAD_FILE_FAILED,
    LOAD_FILE_SUCCESSFULL
} from "../types/file"


// Initial state of Case Reducer
const inittialState = {
    isLoading: false,
    error: null,
    file: null,
    fileType: null
}

// Case reducer
const fileReducer = (state = inittialState, action) => {

    //// destructure action
    const {type, payload} = action

    //// define cases
    switch(type){
        case LOAD_FILE:
            return {
                ...state,
                isLoading: true,
                error: null,
                file: null,
                fileType: null
            }

        case LOAD_FILE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
                file: null,
                fileType: null
            }

        case LOAD_FILE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                file: payload.file,
                fileType: payload.fileType
            }
        default:
            return state
    }
}

export default fileReducer