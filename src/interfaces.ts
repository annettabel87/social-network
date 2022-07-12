import { Store, EmptyObject } from 'redux';

export interface IProfileState {
  posts: IPost[];
  newPostText: string;
}
export interface IPost {
  id: number;
  post: string;
  likeCount: number;
}
export interface IDialogsState {
  dialogs: IDialog[];
  messages: IMessage[];
  newMessageBody: string;
}
export interface IDialog {
  id: number;
  name: string;
}
export interface IMessage {
  id: number;
  message: string;
}
export interface IState {
  profilePage: IProfileState;
  dialogPage: IDialogsState;
}
export interface IReduxState {
  dialogsReducer: IDialogsState;
  profileReducer: IProfileState;
}
export interface IActionType {
  type: string;
  newText?: string;
  body?: string;
}
export interface IDialogsProps {
  state: IDialogsState;
  sendMessage: () => void;
  updateNewMessage: (body: string) => void;
}
export interface IMessageProps {
  text: string;
}

export interface IMyPostsprops {
  posts: IPost[];
  newPostText: string;
  addPost: () => void;
  updateNewTextCreator: (text: string) => void;
}
export interface IPostProps {
  message: string;
  likeCount: number;
}
export interface IAppPops {
  store: Store<
    EmptyObject & {
      dialogsReducer: IDialogsState;
      profileReducer: IProfileState;
    },
    IActionType
  >;
}
