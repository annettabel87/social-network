import { IDialogsState, IActionType } from '../interfaces';

const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export const sendMessagetCreator = () => ({
  type: SEND_MESSAGE,
});

export const updateNewMessageCreator = (body: string) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  body: body,
});
const initialState = {
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
};
const dialogsReducer = (state: IDialogsState = initialState, action: IActionType) => {
  switch (action.type) {
    case SEND_MESSAGE:
      state.messages.push({ id: 4, message: state.newMessageBody });
      state.newMessageBody = '';
      return state;
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageBody = action.body ? action.body : '';
      return state;
    default:
      return state;
  }
};

export default dialogsReducer;
