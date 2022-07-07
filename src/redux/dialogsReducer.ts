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

const dialogsReducer = (state: IDialogsState, action: IActionType) => {
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
