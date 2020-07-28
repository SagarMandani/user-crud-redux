import { combineReducers  } from 'redux';
import userReducer from './userReducer'
import * as types from '../Actions/types'

const appReducer = combineReducers({
    user: userReducer
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = initialState
  }
  return appReducer(state, action)
}

export default rootReducer;