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
  LOAD_ANALYTICS_COMMON_WORD,
  LOAD_ANALYTICS_COMMON_WORD_FAILED,
  LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL,
  LOAD_ANALYTICS_MAXIMUM_COMMON_WORD,
  LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
  LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_SUCCESSFUL,
  LOAD_ANALYTICS_KEYWORD_SEARCH,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
  LOAD_ANALYTICS_KEYWORD_SEARCH_SUCCESSFUL,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_SUCCESSFUL,
  LOAD_ANALYTICS_FILTER,
  LOAD_ANALYTICS_FILTER_FAILED,
  LOAD_ANALYTICS_FILTER_SUCCESSFUL,
  LOAD_ANALYTICS_SEARCHED_TAGS,
  LOAD_ANALYTICS_SEARCHED_TAGS_FAILED,
  LOAD_ANALYTICS_SEARCHED_TAGS_SUCCESSFUL,
  LOAD_ANALYTICS_CUSTOM_SEARCH,
  LOAD_ANALYTICS_CUSTOM_SEARCH_FAILED,
  LOAD_ANALYTICS_CUSTOM_SEARCH_SUCCESSFUL,
  LOAD_COMPARE_CALLS,
  LOAD_COMPARE_CALLS_FAILED,
  LOAD_COMPARE_CALLS_SUCCESSFUL
} from "../types/management";

// initial state
const initialState = {
    isLoading: false,
    error: null,
    todoTasks: null,
    completedTasks: null,
    commonwords: null,
    maxcommonwords: null,
    keyword: null,
    keywordfromcase: null,
    filtercase: null,
    casetags: null,
    customsearch: null,
    comparecalls: null,
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
        case LOAD_ANALYTICS_COMMON_WORD_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
                commonwords: null
            }
        case LOAD_ANALYTICS_COMMON_WORD:
            return {
                ...state,
                isLoading: true,
                error: null,
                commonwords: null
            }
        case LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                error: null,
                commonwords: payload.commonwords
            }
        case LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              maxcommonwords: null,
            }
        case LOAD_ANALYTICS_MAXIMUM_COMMON_WORD:
            return {
              ...state,
              isLoading: true,
              error: null,
              maxcommonwords: null,
            }
        case LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              maxcommonwords: payload.maxcommonwords,
            }
        case LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              keyword: null,
            }
        case LOAD_ANALYTICS_KEYWORD_SEARCH:
            return {
              ...state,
              isLoading: true,
              error: null,
              keyword: null,
            }
        case LOAD_ANALYTICS_KEYWORD_SEARCH_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              keyword: payload.keyword,
            }
        case LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              keywordfromcase: null,
            }
        case LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE:
            return {
              ...state,
              isLoading: true,
              error: null,
              keywordfromcase: null,
            }
        case LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              keywordfromcase: payload.keywordfromcase,
            }
        case LOAD_ANALYTICS_FILTER_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              filtercase: null,
            }
        case LOAD_ANALYTICS_FILTER:
            return {
              ...state,
              isLoading: true,
              error: null,
              filtercase: null,
            }
        case LOAD_ANALYTICS_FILTER_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              filtercase: payload.filtercase,
            }
        case LOAD_ANALYTICS_SEARCHED_TAGS_FAILED:
            return {
              ...state,
              isLoading: false,
              error: payload.error,
              casetags: null,
            }
        case LOAD_ANALYTICS_SEARCHED_TAGS:
            return {
              ...state,
              isLoading: true,
              error: null,
              casetags: null,
            }
        case LOAD_ANALYTICS_SEARCHED_TAGS_SUCCESSFUL:
            return {
              ...state,
              isLoading: false,
              error: null,
              casetags: payload.casetags,
            }
        case LOAD_ANALYTICS_CUSTOM_SEARCH_FAILED:
          return {
            ...state,
            isLoading: false,
            error: payload.error,
            customsearch: null,
          }
        case LOAD_ANALYTICS_CUSTOM_SEARCH:
          return {
            ...state,
            isLoading: true,
            error: null,
            customsearch: null,
          }
        case LOAD_ANALYTICS_CUSTOM_SEARCH_SUCCESSFUL:
          return {
            ...state,
            isLoading: false,
            error: null,
            customsearch: payload.customsearch,
          }
        case LOAD_COMPARE_CALLS_FAILED:
          return {
            ...state,
            isLoading: false,
            error: payload.error,
            comparecalls: null,
          }
        case LOAD_COMPARE_CALLS:
          return {
            ...state,
            isLoading: true,
            error: null,
            comparecalls: null,
          }
        case LOAD_COMPARE_CALLS_SUCCESSFUL:
          return {
            ...state,
            isLoading: false,
            error: null,
            comparecalls: payload.comparecalls,
          }
        default:
            return state
    }
}

export default managementReducer