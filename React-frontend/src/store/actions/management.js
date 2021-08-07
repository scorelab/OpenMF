/*
 * Action generator for management reducer.
 */

import axios from "../../axios";
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
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_SUCCESSFUL,
  LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
  LOAD_ANALYTICS_FILTER,
  LOAD_ANALYTICS_FILTER_SUCCESSFUL,
  LOAD_ANALYTICS_FILTER_FAILED,
  LOAD_ANALYTICS_SEARCHED_TAGS,
  LOAD_ANALYTICS_SEARCHED_TAGS_SUCCESSFUL,
  LOAD_ANALYTICS_SEARCHED_TAGS_FAILED,
  LOAD_ANALYTICS_CUSTOM_SEARCH,
  LOAD_ANALYTICS_CUSTOM_SEARCH_SUCCESSFUL,
  LOAD_ANALYTICS_CUSTOM_SEARCH_FAILED,
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
  LOAD_COMPARE_CALLS_SUCCESSFUL,
  LOAD_COMPARE_CALLS_FAILED,
  LOAD_COMPARE_LOCATIONS,
  LOAD_COMPARE_LOCATIONS_SUCCESSFUL,
  LOAD_COMPARE_LOCATIONS_FAILED,
  LOAD_COMPARE_BROWSER_HISTORY,
  LOAD_COMPARE_BROWSER_HISTORY_SUCCESSFUL,
  LOAD_COMPARE_BROWSER_HISTORY_FAILED,
  LOAD_COMPARE_SMS,
  LOAD_COMPARE_SMS_SUCCESSFUL,
  LOAD_COMPARE_SMS_FAILED,
} from "../types/management";
import { setAlert } from "./alerts";

// ++++++++++++++ Utility functions ++++++++++++++++++++

// function to create config object
const createConfig = (token) => {
  //// create object
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  //// return object
  return config;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++

// Action generator to fetch/load completed tasks
export const loadCompletedTasks = () => (dispatch) => {
  // dispatch laod completed tasks
  dispatch({
    type: LOAD_COMPLETED_TASKS,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_COMPLETED_TASKS_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }

  // create config header object
  const config = createConfig(token);

  // send request to server
  axios
    .get("/task/completed-tasks", config)
    .then((res) => {
      dispatch({
        type: LOAD_COMPLETED_TASKS_SUCCESSFULL,
        payload: {
          tasks: res.data.tasks,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_COMPLETED_TASKS_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_COMPLETED_TASKS_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load common words between cases
export const loadAnalyticsCommonWord = (case1, case2) => (dispatch) => {
  // dispatch laod analytics common word
  dispatch({
    type: LOAD_ANALYTICS_COMMON_WORD,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case1: case1,
    case2: case2,
  };

  // send request to server
  axios
    .post("/common/Case1/Case2", data, config)
    .then((res) => {
      const commonword_json = res.data;

      dispatch({
        type: LOAD_ANALYTICS_COMMON_WORD_SUCCESSFUL,
        payload: {
          commonwords: commonword_json,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_ANALYTICS_COMMON_WORD_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load maximum common words between cases
export const loadAnalyticsMaxCommonWord = (case1, case2) => (dispatch) => {
  // dispatch laod analytics common word
  dispatch({
    type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case1: case1,
    case2: case2,
  };

  // send request to server
  axios
    .post("/common/words/<case1>/<case2>", data, config)
    .then((res) => {
      let max_commonword_json = res.data;

      dispatch({
        type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_SUCCESSFUL,
        payload: {
          maxcommonwords: max_commonword_json,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_ANALYTICS_MAXIMUM_COMMON_WORD_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load todo tasks
export const loadTodoTasks = () => (dispatch) => {
  // dispatch laod completed tasks
  dispatch({
    type: LOAD_TODO_TASKS,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_TODO_TASKS_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }

  // create config header object
  const config = createConfig(token);

  // send request to server
  axios
    .get("/task/todo-tasks", config)
    .then((res) => {
      dispatch({
        type: LOAD_TODO_TASKS_SUCCESSFULL,
        payload: {
          tasks: res.data.tasks,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_TODO_TASKS_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_TODO_TASKS_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load common words between cases
export const loadAnalyticsKeyword = (keyword) => (dispatch) => {
  // dispatch laod analytics common word
  dispatch({
    type: LOAD_ANALYTICS_KEYWORD_SEARCH,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    keyword: keyword,
  };

  // send request to server
  axios
    .post("/keyword/search", data, config)
    .then((res) => {
      const case_data = res.data;

      dispatch({
        type: LOAD_ANALYTICS_KEYWORD_SEARCH_SUCCESSFUL,
        payload: {
          keyword: case_data,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_ANALYTICS_KEYWORD_SEARCH_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load common words from case
export const loadKeywordfromCase = (keyword, keywordfromcase) => (dispatch) => {
  // dispatch laod analytics common word
  dispatch({
    type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    keyword: keyword,
    case_name: keywordfromcase,
  };

  // send request to server
  axios
    .post("/keyword/<case_name>/search", data, config)
    .then((res) => {
      const case_data = res.data;

      dispatch({
        type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_SUCCESSFUL,
        payload: {
          keywordfromcase: case_data,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_ANALYTICS_KEYWORD_SEARCH_FROM_CASE_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load filtered cases
export const loadFilteredCase = (from_date, to_date) => (dispatch) => {
  // dispatch laod filtered cases
  dispatch({
    type: LOAD_ANALYTICS_FILTER,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_FILTER_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    starting_date: from_date,
    end_date: to_date,
  };

  // send request to server
  axios
    .post("/case/filter", data, config)
    .then((res) => {
      const case_data = res.data;

      dispatch({
        type: LOAD_ANALYTICS_FILTER_SUCCESSFUL,
        payload: {
          filtercase: case_data,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_FILTER_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_ANALYTICS_FILTER_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load tag based cases
export const loadTagCases = (tags) => (dispatch) => {
  // dispatch laod tag cases
  dispatch({
    type: LOAD_ANALYTICS_SEARCHED_TAGS,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_SEARCHED_TAGS_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    tags: tags,
  };

  // send request to server
  axios
    .post("/keyword/search/tags", data, config)
    .then((res) => {
      const tag_case_data = res.data;

      dispatch({
        type: LOAD_ANALYTICS_SEARCHED_TAGS_SUCCESSFUL,
        payload: {
          casetags: tag_case_data,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_SEARCHED_TAGS_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_ANALYTICS_SEARCHED_TAGS_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load cases from custom search
export const loadCustomSearchCases = (keyword) => (dispatch) => {
  // dispatch laod cases
  dispatch({
    type: LOAD_ANALYTICS_CUSTOM_SEARCH,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_ANALYTICS_CUSTOM_SEARCH_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    keyword: keyword,
  };

  // send request to server
  axios
    .post("keyword/custom/search", data, config)
    .then((res) => {
      const custom_search_data = res.data;

      dispatch({
        type: LOAD_ANALYTICS_CUSTOM_SEARCH_SUCCESSFUL,
        payload: {
          customsearch: custom_search_data,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_ANALYTICS_CUSTOM_SEARCH_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_ANALYTICS_CUSTOM_SEARCH_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};
// Action generator to fetch/load general info to show in report section
export const loadgeneralinfo = (case_name) => (dispatch) => {
  // dispatch laod report data
  dispatch({
    type: LOAD_REPORT_GENERAL_INFO,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_REPORT_GENERAL_INFO_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case_name: case_name,
  };

  // send request to server
  axios
    .post("/report/generalinfo", data, config)
    .then((res) => {
      const info_data = res.data;

      dispatch({
        type: LOAD_REPORT_GENERAL_INFO_SUCCESSFUL,
        payload: {
          generalinfo: info_data,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_REPORT_GENERAL_INFO_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_REPORT_GENERAL_INFO_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};
// Action generator to fetch/load browser data for report
export const loadBrowserReport = (case_name) => (dispatch) => {
  // dispatch laod browser report data
  dispatch({
    type: LOAD_REPORT_BROWSER_DATA,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_REPORT_BROWSER_DATA_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case_name: case_name,
  };

  // send request to server
  axios
    .post("/report/browserdata", data, config)
    .then((res) => {
      const browser_data = res.data;

      dispatch({
        type: LOAD_REPORT_BROWSER_DATA_SUCCESSFUL,
        payload: {
          browserdata: browser_data,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_REPORT_BROWSER_DATA_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_REPORT_BROWSER_DATA_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};
// Action generator to fetch/load location coordinates
export const loadLocationReport = (case_name) => (dispatch) => {
  // dispatch laod browser report data
  dispatch({
    type: LOAD_REPORT_LOCATION,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_REPORT_LOCATION_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case_name: case_name,
  };

  // send request to server
  axios
    .post("/report/locations", data, config)
    .then((res) => {
      const location_data = res.data;

      dispatch({
        type: LOAD_REPORT_LOCATION_SUCCESSFUL,
        payload: {
          coordinates: location_data,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_REPORT_LOCATION_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_REPORT_LOCATION_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load common calls details
export const loadCompareCalls = (case1, case2) => (dispatch) => {
  // dispatch laod analytics common Calls details
  dispatch({
    type: LOAD_COMPARE_CALLS,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_COMPARE_CALLS_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case_one: case1,
    case_two: case2,
  };

  // send request to server
  axios
    .post("/commonreport/calls", data, config)
    .then((res) => {
      const common_calls = res.data;

      dispatch({
        type: LOAD_COMPARE_CALLS_SUCCESSFUL,
        payload: {
          comparecalls: common_calls,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_COMPARE_CALLS_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_COMPARE_CALLS_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load common coordinates details
export const loadCompareLocations = (case1, case2) => (dispatch) => {
  // dispatch laod analytics common locations details
  dispatch({
    type: LOAD_COMPARE_LOCATIONS,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_COMPARE_LOCATIONS_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case_one: case1,
    case_two: case2,
  };

  // send request to server
  axios
    .post("/commonreport/coordinates", data, config)
    .then((res) => {
      const common_locations = res.data;

      dispatch({
        type: LOAD_COMPARE_LOCATIONS_SUCCESSFUL,
        payload: {
          comparelocations: common_locations,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_COMPARE_LOCATIONS_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_COMPARE_LOCATIONS_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load common browser history details
export const loadCompareHistory = (case1, case2) => (dispatch) => {
  // dispatch laod analytics common browser history details
  dispatch({
    type: LOAD_COMPARE_BROWSER_HISTORY,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_COMPARE_BROWSER_HISTORY_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case_one: case1,
    case_two: case2,
  };

  // send request to server
  axios
    .post("/commonreport/browser", data, config)
    .then((res) => {
      const common_browser_history = res.data;

      dispatch({
        type: LOAD_COMPARE_BROWSER_HISTORY_SUCCESSFUL,
        payload: {
          comparehistory: common_browser_history,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_COMPARE_BROWSER_HISTORY_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_COMPARE_BROWSER_HISTORY_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};

// Action generator to fetch/load common sms details
export const loadCompareSms = (case1, case2) => (dispatch) => {
  // dispatch laod analytics common sms details
  dispatch({
    type: LOAD_COMPARE_SMS,
  });

  // Get jwt token from local Storage
  const token = localStorage.getItem("openmf_token");

  // check if token exists or not
  if (!token) {
    dispatch({
      type: LOAD_COMPARE_SMS_FAILED,
      payload: {
        error: "Unauthorized, Please Login Again.",
      },
    });
    return;
  }
  // create config header object
  const config = createConfig(token);

  const data = {
    case_one: case1,
    case_two: case2,
  };

  // send request to server
  axios
    .post("/commonreport/sms", data, config)
    .then((res) => {
      const common_sms = res.data;

      dispatch({
        type: LOAD_COMPARE_SMS_SUCCESSFUL,
        payload: {
          comparesms: common_sms,
        },
      });
      dispatch(setAlert(res.data.message, "success"));
    })
    .catch((err) => {
      const res = err.response;
      if (
        res &&
        (res.status === 404 || res.status === 500 || res.status === 403)
      ) {
        dispatch({
          type: LOAD_COMPARE_SMS_FAILED,
          payload: {
            error: res.data.message,
          },
        });
        dispatch(setAlert(res.data.message));
      }
      dispatch({
        type: LOAD_COMPARE_SMS_FAILED,
        payload: {
          error: "Something Went Wrong.",
        },
      });
      dispatch(setAlert("Something Went Wrong."));
    });
};
