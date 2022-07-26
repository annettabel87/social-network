import { Params } from 'react-router-dom';
import { Store, EmptyObject } from 'redux';

export interface IProfileState {
  posts: IPost[];
  newPostText: string;
  profile: IProfile | null;
}

export interface IProfile {
  aboutMe: string;
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: {
    small: string;
    large: string;
  };
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
  profile?: IProfile;
  data?: IUserData;
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
  followingInProgress: number[];
}
export interface IUser {
  name: string;
  id: number;
  uniqueUrlName: string;
  photos: { small: string; large: string };
  followed: boolean;
  status: string;
}
export interface IUserData {
  id: number | null;
  email: string | null;
  login: string | null;
}
export interface IAuthState {
  id: number | null;
  email: string | null;
  login: string | null;
  isFetching: boolean;
  isAuth: boolean;
}
export interface IAuthContainerProps {
  id: number | null;
  email: string | null;
  login: string | null;
  isFetching: boolean;
  isAuth: boolean;
  setUserData: (data: IUserData) => void;
  toggleIsFetching: (isFetching: boolean) => void;
}
export interface IWithRouterProps {
  state: IProfileState;
  setUserProfile: (profile: IProfile) => void;
  params: Readonly<Params<string>>;
}
export interface IProfileContainerComponentProps {
  state: IProfileState;
  setUserProfile: (profile: IProfile) => void;
}
export interface IUsersContainerComponentProps {
  state: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  isFetching: boolean;
  followingInProgress: number[];
  toggleFollow: (userId: number) => void;
  setUsers: (users: IUser[]) => void;
  setCurrentPage: (page: number) => void;
  setUsersCount: (usersCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
  toggleIsFollowingInProgress: (userId: number, isFetching: boolean) => void;
}
