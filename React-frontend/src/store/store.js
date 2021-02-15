import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import alerts from './reducers/alerts';
import auth from './reducers/auth';

// Combine each reducer here
const rootReducer = combineReducers({
  alerts,
  user: auth
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
