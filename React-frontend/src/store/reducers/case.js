/*
    Case reducer definition.
*/


// Types for case reducers
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
    SELECT_CASE_SUCCESSFULL,
} from "../types/case"


// Initial state of Case Reducer
const inittialState = {
    isLoading: false,
    error: null,
    caseTree: null,
    cases: null,
    selected_case: null,
}

// Case reducer
const caseReducer = (state = inittialState, action) => {

    //// destructure action
    const {type, payload} = action

    //// define cases
    switch(type){
        case DEFAULT_CASE_STATE:
            return {
                ...state,
                isLoading: false,
                caseTree: null,
                cases: null,
                selected_case: null,
                error: null
            }

        case LOAD_CASE_TREE:
        case LOAD_CASES:
        case SELECT_CASE:
            return {
                ...state,
                isLoading: true,
                error: null,
            }

        case LOAD_CASE_TREE_FAILED:
        case LOAD_CASES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
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

        case SELECT_CASE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }

        case SELECT_CASE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                selected_case: payload.case
            }

        default:
            return state
    }
}

export default caseReducer