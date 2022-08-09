import { Dispatch } from 'redux';
import { profileAPI } from '../API/Api';
import { IProfileState, IActionType, IPost, IProfile } from '../interfaces';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

export const addPostCreator = (postText: string) => ({
  type: ADD_POST,
  postText: postText,
});

export const setUserProfile = (profile: IProfile | null) => ({
  type: SET_USER_PROFILE,
  profile: profile,
});
export const setStatusCreator = (status: string) => ({
  type: SET_STATUS,
  status: status,
});
const initialState = {
  posts: [
    { id: 1, post: 'Hello', likeCount: 4 },
    { id: 2, post: 'My post 1', likeCount: 2 },
    { id: 3, post: 'My post 2', likeCount: 56 },
    { id: 4, post: 'My post 3', likeCount: 100 },
  ],
  profile: null,
  status: '',
};
const profileReducer = (state: IProfileState = initialState, action: IActionType) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: IPost = {
        id: 5,
        post: action.postText ? action.postText : '',
        likeCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }

    default:
      return state;
  }
};
export const getUserPage = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getUserPage(userId).then((response) => {
      dispatch(setUserProfile(response));
    });
  };
};

export const getStatus = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setStatusCreator(response));
    });
  };
};

export const updateStatus = (status: string) => {
  return (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatusCreator(status));
      }
    });
  };
};
export default profileReducer;
