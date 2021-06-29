import {
    FETCH_MEMBERS,
    FETCH_MEMBERS_SUCCESSFULL,
    FETCH_MEMBERS_FAILED,
    SELECT_USER
} from '../types/admin';



// Initial state of admin reducer
const inittialState = {
    isLoading: false,
    extractors: [],
    managements: [],
    selected_user : null,
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
        case SELECT_USER:
            return {
                ...state,
                selected_user: payload.user
            }
        default:
            return state
    }
}

export default adminReducer