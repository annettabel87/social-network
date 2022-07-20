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
  usersReducer: IUsersState;
}
export interface IActionType {
  type: string;
  newText?: string;
  body?: string;
  userId?: number;
  users?: IUser[];
  usersCount?: number;
  currentPage?: number;
  isFetching?: boolean;
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
      usersReducer: IUsersState;
    },
    IActionType
  >;
}
export interface IUsersState {
  users: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  isFetching: boolean;
}
export interface IUser {
  name: string;
  id: number;
  uniqueUrlName: string;
  photos: { small: string; large: string };
  followed: boolean;
  status: string;
}
