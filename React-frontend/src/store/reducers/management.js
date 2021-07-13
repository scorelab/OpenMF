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
    LOAD_TODO_TASKS_SUCCESSFULL
} from "../types/management"

// initial state
const initialState = {
    isLoading: false,
    error: null,
    todoTasks: null,
    completedTasks: null
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

        default:
            return state
    }
}

export default managementReducer