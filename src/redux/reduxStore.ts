import { combineReducers, createStore } from 'redux';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  dialogsReducer,
  profileReducer,
  usersReducer,
});
const store = createStore(rootReducer);

export default store;
