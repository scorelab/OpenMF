import {
    FETCH_MEMBERS,
    FETCH_MEMBERS_SUCCESSFULL,
    FETCH_MEMBERS_FAILED,
    SELECT_USER,
    MEMBER_DELETE,
    MEMBER_DELETE_FAILED,
    MEMBER_DELETE_SUCCESSFULL,
    MEMBER_ADD,
    MEMBER_ADD_FAILED,
    MEMBER_ADD_SUCCESSFULL,
    MEMBER_ROLE_UPDATE,
    MEMBER_ROLE_UPDATE_FAILED,
    MEMBER_ROLE_UPDATE_SUCCESSFULL
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

        case MEMBER_DELETE:
            return {
                ...state,
                isLoading: true,
                error: null,
            }

        case MEMBER_DELETE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }

        case MEMBER_DELETE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                selected_user: null
            }

        case MEMBER_ADD:
            return {
                ...state,
                error: null,
                isLoading: true,
            }

        case MEMBER_ADD_SUCCESSFULL:
            return {
                ...state,
                isLoading: false
            }

        case MEMBER_ADD_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }

        case MEMBER_ROLE_UPDATE:
            return {
                ...state,
                error: null,
                isLoading: true,
            }

        case MEMBER_ROLE_UPDATE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }

        case MEMBER_ROLE_UPDATE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                selected_user: null
            }
        default:
            return state
    }
}

export default adminReducer