import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './appReducer';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  dialogsReducer,
  profileReducer,
  usersReducer,
  authReducer,
  appReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
