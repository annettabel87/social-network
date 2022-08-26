import { NavigateFunction, Params } from 'react-router-dom';
import { Store, EmptyObject } from 'redux';

export interface IProfileState {
  posts: IPost[];
  profile: IProfile | null;
  status: string;
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
  status?: string;
  isAuth?: boolean;
  postText?: string;
  messageText?: string;
  postId?: number;
}
export interface IDialogsProps {
  state: IDialogsState;
  isAuth: boolean;
  sendMessage: (messageText: string) => void;
}
export interface IMessageProps {
  text: string;
}

export interface IMyPostsprops {
  posts: IPost[];
  addPost: (postText: string) => void;
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
  getAuthInfo: () => void;
  logOut: () => void;
}
export interface IWithRouterProps {
  state: IProfileState;
  isAuth: boolean;
  params: Readonly<Params<string>>;
  status: string;
  authorizedUserId: number;
  navigate: NavigateFunction;
  getUserPage: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
}
export interface IProfileContainerComponentProps {
  state: IProfileState;
  getUserPage: (userId: number) => void;
  isAuth: boolean;
  status: string;
  authorizedUserId: number;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
}
export interface IUsersContainerComponentProps {
  state: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  isFetching: boolean;
  followingInProgress: number[];
  toggleFollowThunk: (userId: number, userFollowed: boolean) => void;
  toggleIsFetching: (isFetching: boolean) => void;
  toggleIsFollowingInProgress: (userId: number, isFetching: boolean) => void;
  requestUsers: (currentPage: number, pageSize: number) => void;
}
export interface IMapStateAuth {
  isAuth: boolean;
}
export interface IProfileStatusProps {
  status: string;
  updateStatus: (status: string) => void;
}
export interface IGetUsersData {
  error: string | null;
  items: IUser[];
  totalCount: number;
}
export interface IAuthData {
  data: IUserData;
  resultCode: number;
}
export interface IFollowUserData {
  messages: string[];
  resultCode: number;
}
export interface IProfileProps {
  profile: IProfile | null;
  status: string;
  updateStatus: (status: string) => void;
}
export interface IUsersProps {
  state: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  followingInProgress: number[];
  toggleFollow: (userId: number, userFollowed: boolean) => void;
  onChangedPage: (page: number) => void;
}
export interface ILoginData {
  resultCode: number;
  messages: string[];
  data: {
    userId: number;
  };
}

export interface ILoginProps {
  logIn: (
    email: string,
    password: string,
    rememberMe: boolean,
    setStatus: (status: string) => void
  ) => void;
  isAuth: boolean;
}
export interface ILogoutData {
  resultCode: number;
  messages: string[];
}
export interface IAppComponentProps {
  initializedSuccess: () => void;
  initialized: boolean;
}
export interface IAppState {
  initialized: boolean;
}
