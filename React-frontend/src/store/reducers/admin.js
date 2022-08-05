/*
    Admin reducer definition.
*/

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
    MEMBER_ROLE_UPDATE_SUCCESSFULL,
    TASK_CREATE,
    TASK_CREATE_FAILED,
    TASK_CREATE_SUCCESSFULL,
    TASK_FETCH,
    TASK_FETCH_FAILED,
    TASK_FETCH_SUCCESSFULL,
    TASK_UPDATE,
    TASK_UPDATE_FAILED,
    TASK_UPDATE_SUCCESSFULL,
} from '../types/admin';



// Initial state of admin reducer
const inittialState = {
    isLoading: false,
    extractors: [],
    managements: [],
    tasks: [],
    selected_user : null,
    error: null
}


// Admin Reducer
const adminReducer = (state = inittialState, action) => {
    const {type, payload} = action;
    switch(type){

        case TASK_CREATE:
        case MEMBER_ADD:
        case MEMBER_DELETE:
        case MEMBER_ROLE_UPDATE:
        case FETCH_MEMBERS:
        case TASK_FETCH:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case FETCH_MEMBERS_FAILED:
        case TASK_CREATE_FAILED:
        case MEMBER_ROLE_UPDATE_FAILED:
        case MEMBER_ADD_FAILED:
        case MEMBER_DELETE_FAILED:
        case TASK_FETCH_FAILED:
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

        case MEMBER_DELETE_SUCCESSFULL:
        case MEMBER_ROLE_UPDATE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                selected_user: null
            }


        case MEMBER_ADD_SUCCESSFULL:
        case TASK_CREATE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null
            }

        case TASK_FETCH_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                tasks: payload.tasks,
                error: null,
            }
        
        case TASK_UPDATE:
        case TASK_UPDATE_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null
            }

        case TASK_UPDATE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }

        default:
            return state
    }
}

export default adminReducer