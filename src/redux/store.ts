import { IState, IActionType } from '../interfaces';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';

const store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, post: 'Hello', likeCount: 4 },
        { id: 2, post: 'My post 1', likeCount: 2 },
        { id: 3, post: 'My post 2', likeCount: 56 },
        { id: 4, post: 'My post 3', likeCount: 100 },
      ],
      newPostText: '',
    },
    dialogPage: {
      dialogs: [
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Aleksey' },
        { id: 3, name: 'Lev' },
        { id: 4, name: 'Mikhail' },
      ],
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hello world' },
        { id: 3, message: 'How are you?' },
      ],
      newMessageBody: '',
    },
  },
  getState() {
    return this._state;
  },
  _callSubscriber(state: IState | null) {
    console.log(state);
  },
  subscribe(observer: () => void) {
    this._callSubscriber = observer;
  },
  dispatch(action: IActionType) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
    this._callSubscriber(this._state);
  },
};

export default store;
