import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from './reducers/auth';
import users from './reducers/users';
import alerts from './reducers/alerts';
import admin from './reducers/admin';
import extractor from './reducers/extractor';

// Combine each reducer here
const rootReducer = combineReducers({
  auth,
  users,
  alerts,
  admin,
  extractor
});

const initialState = {};

// middleware for handling async functions
const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  // dev tools for viewing redux state and changes in chrome
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
