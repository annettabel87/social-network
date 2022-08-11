import { IDialogsState, IActionType } from '../interfaces';

const SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessagetCreator = (messageText: string) => ({
  type: SEND_MESSAGE,
  messageText: messageText,
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
};
const dialogsReducer = (state: IDialogsState = initialState, action: IActionType) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, { id: 4, message: action.messageText }],
      };
    }

    default:
      return state;
  }
};

export default dialogsReducer;
