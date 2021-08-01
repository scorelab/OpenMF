/*
*  Redux entry point
*  Redux store
*/

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';


// Importing Reducers
import auth from './reducers/auth';
import users from './reducers/users';
import alerts from './reducers/alerts';
import admin from './reducers/admin';
import extractor from './reducers/extractor';
import caseReducer from './reducers/case';
import management from './reducers/management';
import device from './reducers/device';
import extract from './reducers/extract';
import fileReducer from './reducers/file';


// Combine each reducer here
const rootReducer = combineReducers({
  auth,
  users,
  alerts,
  admin,
  extractor,
  management,

  device,
  extract,
  case: caseReducer,
  file: fileReducer
});

// Initial state
const initialState = {};

// middleware for handling async functions
const middleWare = [thunk];


// main store
const store = createStore(
  rootReducer,
  initialState,
  // dev tools for viewing redux state and changes in chrome
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
