/*
* Reducer definition for management.
*/


// Import action types
import {
    LOAD_COMPLETED_TASKS,
    LOAD_COMPLETED_TASKS_FAILED,
    LOAD_COMPLETED_TASKS_SUCCESSFULL,
    LOAD_TODO_TASKS,
    LOAD_TODO_TASKS_FAILED,
    LOAD_TODO_TASKS_SUCCESSFULL,
    LOAD_REPORT_GENERAL_INFO,
    LOAD_REPORT_GENERAL_INFO_FAILED,
    LOAD_REPORT_GENERAL_INFO_SUCCESSFUL,
    LOAD_REPORT_BROWSER_DATA,
    LOAD_REPORT_BROWSER_DATA_FAILED,
    LOAD_REPORT_BROWSER_DATA_SUCCESSFUL,
    LOAD_REPORT_LOCATION,
    LOAD_REPORT_LOCATION_FAILED,
    LOAD_REPORT_LOCATION_SUCCESSFUL
} from "../types/management"

// initial state
const initialState = {
    isLoading: false,
    error: null,
    todoTasks: null,
    completedTasks: null,
    generalinfo: null,
    browserdata: null,
    coordinates: null,
}

// Reducer definition
const managementReducer = (state = initialState, action) => {

    // desctructor action
    const {type, payload} = action

    // define cases
    switch (type) {
        case LOAD_COMPLETED_TASKS:
        case LOAD_TODO_TASKS:
            return {
                ...state,
                isLoading: true,
                error: null,
                todoTasks: null,
                completedTasks: null
            }

        case LOAD_COMPLETED_TASKS_FAILED:
        case LOAD_TODO_TASKS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
                todoTasks: null,
                completedTasks: null
            }

        case LOAD_TODO_TASKS_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                todoTasks: payload.tasks
            }

        case LOAD_COMPLETED_TASKS_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                error: null,
                completedTasks: payload.tasks
            }
        case LOAD_REPORT_GENERAL_INFO_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              generalinfo: null,
            }
        case LOAD_REPORT_GENERAL_INFO:
            return {
              ...state,
              isLoading: true,
              error: null,
              generalinfo: null,
            }
        case LOAD_REPORT_GENERAL_INFO_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              generalinfo: payload.generalinfo,
            }
        case LOAD_REPORT_BROWSER_DATA_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              browserdata: null,
            }
        case LOAD_REPORT_BROWSER_DATA:
            return {
              ...state,
              isLoading: true,
              error: null,
              browserdata: null,
            }
        case LOAD_REPORT_BROWSER_DATA_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              browserdata: payload.browserdata,
            }
        case LOAD_REPORT_LOCATION_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              coordinates: null,
            }
        case LOAD_REPORT_LOCATION:
            return {
              ...state,
              isLoading: true,
              error: null,
              coordinates: null,
            }
        case LOAD_REPORT_LOCATION_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              coordinates: payload.coordinates,
            }
        default:
            return state
    }
}

export default managementReducer