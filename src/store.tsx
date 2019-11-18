import { combineReducers, createStore, applyMiddleware } from 'redux'
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

export default createStore(rootReducer, enhancer);;
