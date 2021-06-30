// Extractor reducer

import {
    FETCH_EXTRACTED_CASES,
    FETCH_EXTRACTED_CASES_SUCCESSFULL,
    FETCH_EXTRACTED_CASES_FAILED,
    EXTRACTOR_DEFAULT
} from '../types/extractor';

// initial state of extractor reducer
const initialState = {
    is_loading: false,
    error: null,
    extracted_cases:null
}

// extractor reduer
const extractorReducer = (state=initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case EXTRACTOR_DEFAULT:
            return {
                ...state,
                is_loading: false,
                error: null,
                extracted_cases: null
            }
        case FETCH_EXTRACTED_CASES:
            return {
                ...state,
                is_loading: true
            }

        case FETCH_EXTRACTED_CASES_SUCCESSFULL:
            return {
                ...state,
                is_loading: false,
                error: null,
                extracted_cases: payload.extracted_cases
            }

        case FETCH_EXTRACTED_CASES_FAILED:
            return {
                ...state,
                is_loading: false,
                extracted_cases: null,
                error: payload.error
            }
        default:
            return state
    }
}

export default extractorReducer