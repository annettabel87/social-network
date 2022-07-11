import { combineReducers, createStore } from 'redux';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  dialogsReducer,
  profileReducer,
});
const store = createStore(rootReducer);

export default store;
