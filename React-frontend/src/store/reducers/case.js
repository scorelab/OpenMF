/*
    Case reducer definition.
*/

import { LOAD_CASE_TREE, LOAD_CASE_TREE_FAILED, LOAD_CASE_TREE_SUCCESSFULL } from "../types/case"


// Initial state of Case Reducer
const inittialState = {
    isLoading: false,
    error: null,
    caseTree: null
}

// Case reducer
const caseReducer = (state = inittialState, action) => {

    //// destructure action
    const {type, payload} = action

    //// define cases
    switch(type){
        case LOAD_CASE_TREE:
            return {
                ...state,
                isLoading: true,
                error: null,
            }

        case LOAD_CASE_TREE_FAILED:
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
                caseTree: payload.tree
            }

        default:
            return state
    }
}

export default caseReducer