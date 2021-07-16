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
        case LOAD_CASE_TREE:
        case LOAD_CASES:
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

        default:
            return state
    }
}

export default caseReducer