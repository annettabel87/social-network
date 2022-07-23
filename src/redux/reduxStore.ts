import { combineReducers, createStore } from 'redux';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  dialogsReducer,
  profileReducer,
  usersReducer,
  authReducer,
});
const store = createStore(rootReducer);

export default store;
