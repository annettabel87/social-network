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
export interface IActionType {
  type: string;
  newText?: string;
  body?: string;
}
export interface IDialogsProps {
  state: IDialogsState;
  dispatch: (action: IActionType) => void;
}
export interface IMessageProps {
  text: string;
}
export interface IProfileProps {
  state: IProfileState;
  dispatch: (action: IActionType) => void;
}
export interface IMyPostsprops {
  state: IProfileState;
  dispatch: (action: IActionType) => void;
}
export interface IPostProps {
  message: string;
  likeCount: number;
}
export interface IAppPops {
  dispatch: (action: IActionType) => void;
  state: IState;
}
