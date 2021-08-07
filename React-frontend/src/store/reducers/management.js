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
  LOAD_REPORT_GENERAL_INFO,
  LOAD_REPORT_GENERAL_INFO_FAILED,
  LOAD_REPORT_GENERAL_INFO_SUCCESSFUL,
  LOAD_REPORT_BROWSER_DATA,
  LOAD_REPORT_BROWSER_DATA_FAILED,
  LOAD_REPORT_BROWSER_DATA_SUCCESSFUL,
  LOAD_REPORT_LOCATION,
  LOAD_REPORT_LOCATION_FAILED,
  LOAD_REPORT_LOCATION_SUCCESSFUL,
  LOAD_COMPARE_CALLS,
  LOAD_COMPARE_CALLS_FAILED,
  LOAD_COMPARE_CALLS_SUCCESSFUL,
  LOAD_COMPARE_LOCATIONS,
  LOAD_COMPARE_LOCATIONS_FAILED,
  LOAD_COMPARE_LOCATIONS_SUCCESSFUL,
  LOAD_COMPARE_BROWSER_HISTORY,
  LOAD_COMPARE_BROWSER_HISTORY_FAILED,
  LOAD_COMPARE_BROWSER_HISTORY_SUCCESSFUL,
  LOAD_COMPARE_SMS,
  LOAD_COMPARE_SMS_FAILED,
  LOAD_COMPARE_SMS_SUCCESSFUL,
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
  generalinfo: null,
  browserdata: null,
  coordinates: null,
  comparecalls: null,
  comparelocations: null,
  comparehistory: null,
  comparesms: null,
};

// Reducer definition
const managementReducer = (state = initialState, action) => {
  // desctructor action
  const { type, payload } = action;

  // define cases
  switch (type) {
    case LOAD_COMPLETED_TASKS:
    case LOAD_TODO_TASKS:
      return {
        ...state,
        isLoading: true,
        error: null,
        todoTasks: null,
        completedTasks: null,
      };

    case LOAD_COMPLETED_TASKS_FAILED:
    case LOAD_TODO_TASKS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        todoTasks: null,
        completedTasks: null,
      };

    case LOAD_TODO_TASKS_SUCCESSFULL:
      return {
        ...state,
        isLoading: false,
        error: null,
        todoTasks: payload.tasks,
      };

    case LOAD_COMPLETED_TASKS_SUCCESSFULL:
      return {
        ...state,
        isLoading: false,
        error: null,
        completedTasks: payload.tasks,
      };
    case LOAD_ANALYTICS_COMMON_WORD_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        commonwords: null,
      };
    case LOAD_ANALYTICS_COMMON_WORD:
      return {
        ...state,
        isLoading: true,
        error: null,
        commonwords: null,
      };
    case LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        commonwords: payload.commonwords,
      };
    case LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        maxcommonwords: null,
      };
    case LOAD_ANALYTICS_MAXIMUM_COMMON_WORD:
      return {
        ...state,
        isLoading: true,
        error: null,
        maxcommonwords: null,
      };
    case LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        maxcommonwords: payload.maxcommonwords,
      };
    case LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        keyword: null,
      };
    case LOAD_ANALYTICS_KEYWORD_SEARCH:
      return {
        ...state,
        isLoading: true,
        error: null,
        keyword: null,
      };
    case LOAD_ANALYTICS_KEYWORD_SEARCH_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        keyword: payload.keyword,
      };
    case LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        keywordfromcase: null,
      };
    case LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE:
      return {
        ...state,
        isLoading: true,
        error: null,
        keywordfromcase: null,
      };
    case LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        keywordfromcase: payload.keywordfromcase,
      };
    case LOAD_ANALYTICS_FILTER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        filtercase: null,
      };
    case LOAD_ANALYTICS_FILTER:
      return {
        ...state,
        isLoading: true,
        error: null,
        filtercase: null,
      };
    case LOAD_ANALYTICS_FILTER_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        filtercase: payload.filtercase,
      };
    case LOAD_ANALYTICS_SEARCHED_TAGS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        casetags: null,
      };
    case LOAD_ANALYTICS_SEARCHED_TAGS:
      return {
        ...state,
        isLoading: true,
        error: null,
        casetags: null,
      };
    case LOAD_ANALYTICS_SEARCHED_TAGS_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        casetags: payload.casetags,
      };
    case LOAD_ANALYTICS_CUSTOM_SEARCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        customsearch: null,
      };
    case LOAD_ANALYTICS_CUSTOM_SEARCH:
      return {
        ...state,
        isLoading: true,
        error: null,
        customsearch: null,
      };
    case LOAD_ANALYTICS_CUSTOM_SEARCH_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        customsearch: payload.customsearch,
      };
    case LOAD_REPORT_GENERAL_INFO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        generalinfo: null,
      };
    case LOAD_REPORT_GENERAL_INFO:
      return {
        ...state,
        isLoading: true,
        error: null,
        generalinfo: null,
      };
    case LOAD_REPORT_GENERAL_INFO_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        generalinfo: payload.generalinfo,
      };
    case LOAD_REPORT_BROWSER_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        browserdata: null,
      };
    case LOAD_REPORT_BROWSER_DATA:
      return {
        ...state,
        isLoading: true,
        error: null,
        browserdata: null,
      };
    case LOAD_REPORT_BROWSER_DATA_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        browserdata: payload.browserdata,
      };
    case LOAD_REPORT_LOCATION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        coordinates: null,
      };
    case LOAD_REPORT_LOCATION:
      return {
        ...state,
        isLoading: true,
        error: null,
        coordinates: null,
      };
    case LOAD_REPORT_LOCATION_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        coordinates: payload.coordinates,
      };
    case LOAD_COMPARE_CALLS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        comparecalls: null,
      };
    case LOAD_COMPARE_CALLS:
      return {
        ...state,
        isLoading: true,
        error: null,
        comparecalls: null,
      };
    case LOAD_COMPARE_CALLS_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        comparecalls: payload.comparecalls,
      };
    case LOAD_COMPARE_LOCATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        comparelocations: null,
      };
    case LOAD_COMPARE_LOCATIONS:
      return {
        ...state,
        isLoading: true,
        error: null,
        comparelocations: null,
      };
    case LOAD_COMPARE_LOCATIONS_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        comparelocations: payload.comparelocations,
      };
    case LOAD_COMPARE_BROWSER_HISTORY_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        comparehistory: null,
      };
    case LOAD_COMPARE_BROWSER_HISTORY:
      return {
        ...state,
        isLoading: true,
        error: null,
        comparehistory: null,
      };
    case LOAD_COMPARE_BROWSER_HISTORY_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        comparehistory: payload.comparehistory,
      };
    case LOAD_COMPARE_SMS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        comparesms: null,
      };
    case LOAD_COMPARE_SMS:
      return {
        ...state,
        isLoading: true,
        error: null,
        comparesms: null,
      };
    case LOAD_COMPARE_SMS_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        error: null,
        comparesms: payload.comparesms,
      };
    default:
      return state;
  }
};

export default managementReducer;
