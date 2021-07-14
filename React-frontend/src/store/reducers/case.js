/*
    Case reducer definition.
*/


// Types for case reducers
import {
    LOAD_CASES,
    LOAD_CASES_FAILED,
    LOAD_CASES_SUCCESSFULL,
    LOAD_CASE_TREE,
    LOAD_CASE_TREE_FAILED,
    LOAD_CASE_TREE_SUCCESSFULL,
    LOAD_FILE,
    LOAD_FILE_FAILED,
    LOAD_FILE_SUCCESSFULL
} from "../types/case"


// Initial state of Case Reducer
const inittialState = {
    isLoading: false,
    error: null,
    caseTree: null,
    cases: null,
    selected_case: null,
    file: null
}

// Case reducer
const caseReducer = (state = inittialState, action) => {

    //// destructure action
    const {type, payload} = action

    //// define cases
    switch(type){
        case LOAD_CASE_TREE:
        case LOAD_CASES:
        case LOAD_FILE:
            return {
                ...state,
                isLoading: true,
                error: null,
                file: null
            }
            
        case LOAD_CASE_TREE_FAILED:
        case LOAD_CASES_FAILED:
        case LOAD_FILE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
                file: null,
                caseTree: null
            }

        case LOAD_CASE_TREE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                caseTree: payload.tree,
                selected_case: payload.case
            }

        case LOAD_CASES_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                cases: payload.cases
            }

        case LOAD_FILE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                file: payload.file
            }
        default:
            return state
    }
}

export default caseReducer