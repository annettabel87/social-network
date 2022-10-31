import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { chatAPI } from '../API/chatAPI';
import { IActionType, IChatMessages, IChatState, StatusType } from '../interfaces';
import { RootState } from './reduxStore';
import { v1 } from 'uuid';

export type ChatMessageType = IChatMessages & { id: string };

const MESSAGES_RECEVIED = 'MESSAGES_RECEVIED';
const STATUS_CHANGED = 'STATUS_CHANGED';

const messagesReceived = (messages: IChatMessages[]) => {
  return {
    type: MESSAGES_RECEVIED,
    messages: messages,
  };
};
const statusChanged = (statusWs: StatusType) => {
  return {
    type: STATUS_CHANGED,
    statusWs: statusWs,
  };
};
const initialState = {
  messages: [] as ChatMessageType[],
  statusWs: 'pending' as StatusType,
};
const chatReducer = (state: IChatState = initialState, action: IActionType): IChatState => {
  switch (action.type) {
    case MESSAGES_RECEVIED: {
      return {
        ...state,
        messages: action.messages
          ? [...state.messages, ...action.messages.map((m) => ({ ...m, id: v1() }))].filter(
              (m, index, array) => index >= array.length - 100
            )
          : [],
      };
    }

    case STATUS_CHANGED: {
      return {
        ...state,
        statusWs: action.statusWs ? action.statusWs : 'pending',
      };
    }

    default:
      return state;
  }
};
let _newMessageHandler: ((messages: IChatMessages[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(statusChanged(status));
    };
  }
  return _statusChangedHandler;
};
export const startMessagesListening = (): ThunkAction<void, RootState, unknown, IActionType> => {
  return async (dispatch: Dispatch) => {
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.start();
  };
};
export const stopMessagesListening = (): ThunkAction<void, RootState, unknown, IActionType> => {
  return async (dispatch: Dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
  };
};

export const sendMessage = (message: string) => async () => {
  chatAPI.sendMessage(message);
};

export default chatReducer;
