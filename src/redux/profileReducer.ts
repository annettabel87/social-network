import { IProfileState, IActionType, IPost } from '../interfaces';

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

export const addPostCreator = () => ({
  type: ADD_POST,
});

export const updateNewTextCreator = (text: string) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
const initialState = {
  posts: [
    { id: 1, post: 'Hello', likeCount: 4 },
    { id: 2, post: 'My post 1', likeCount: 2 },
    { id: 3, post: 'My post 2', likeCount: 56 },
    { id: 4, post: 'My post 3', likeCount: 100 },
  ],
  newPostText: '',
};
const profileReducer = (state: IProfileState = initialState, action: IActionType) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: IPost = {
        id: 5,
        post: state.newPostText,
        likeCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }

    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText ? action.newText : '',
      };
    }

    default:
      return state;
  }
};

export default profileReducer;
