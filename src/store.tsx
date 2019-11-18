import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from "redux-thunk";

import * as Reducers from './reducers'
import * as types from "./actions/actionTypes";

const reducers = {...Reducers};

const appReducer = combineReducers({
  ...reducers,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === types.CLEAR_REDUX_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

const middleware = [ReduxThunk];
let enhancer = applyMiddleware(...middleware);

// Start setup for the ReduxDev Tools ----------------------
declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}
const devTools =
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  null;

if (devTools) {
  enhancer = compose(
    applyMiddleware(...middleware),
    devTools
  );
}
// End setup for the ReduxDev Tools ------------------------

export default createStore(rootReducer, enhancer);
