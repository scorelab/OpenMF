import {
    FETCH_MEMBERS,
    FETCH_MEMBERS_SUCCESSFULL,
    FETCH_MEMBERS_FAILED
} from '../types/admin';



// Initial state of admin reducer
const inittialState = {
    isLoading: false,
    extractors: [],
    managements: [],
    error: null
}


// Admin Reducer
const adminReducer = (state = inittialState, action) => {
    const {type, payload} = action;
    switch(type){
        case FETCH_MEMBERS:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_MEMBERS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }
        case FETCH_MEMBERS_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                extractors: payload.extractors,
                managements: payload.managements,
                error: null
            }
        default:
            return state
    }
}

export default adminReducer