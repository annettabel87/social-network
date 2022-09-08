import { Dispatch } from 'redux';
import { profileAPI } from '../API/Api';
import { IProfileState, IActionType, IPost, IProfile } from '../interfaces';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';

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
export const deletePostCreator = (postId: number) => ({
  type: DELETE_POST,
  postId,
});
export const savePhotoCreator = (photo: string) => ({
  type: SAVE_PHOTO,
  photo: photo,
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

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
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

    case SAVE_PHOTO: {
      return state.profile !== null
        ? {
            ...state,
            profile: { ...state.profile, photos: { ...state.profile.photos, small: action.photo } },
          }
        : { ...state };
    }

    default:
      return state;
  }
};
export const getUserPage = (userId: number) => {
  return async (dispatch: Dispatch) => {
    const response = await profileAPI.getUserPage(userId);
    dispatch(setUserProfile(response));
  };
};

export const getStatus = (userId: number) => {
  return async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatusCreator(response));
  };
};

export const updateStatus = (status: string) => {
  return async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatusCreator(status));
    }
  };
};

export const savePhoto = (photo: File) => {
  return async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(photo);
    if (response.resultCode === 0) {
      dispatch(savePhotoCreator(response.data.small));
    }
  };
};
export default profileReducer;
