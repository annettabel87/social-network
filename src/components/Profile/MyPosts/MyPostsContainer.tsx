import { connect } from 'react-redux';
import { EmptyObject, Dispatch } from 'redux';
import { IDialogsState, IProfileState, IActionType } from '../../../interfaces';
import { addPostCreator, updateNewTextCreator } from '../../../redux/profileReducer';

import MyPosts from './MyPosts';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
  }
) => {
  return {
    posts: state.profileReducer.posts,
    newPostText: state.profileReducer.newPostText,
  };
};

const mapDispatch = (dispatch: Dispatch<IActionType>) => {
  return {
    addPost: () => {
      dispatch(addPostCreator());
    },
    updateNewTextCreator: (text: string) => {
      dispatch(updateNewTextCreator(text));
    },
  };
};
const MyPostsContainer = connect(mapState, mapDispatch)(MyPosts);
export default MyPostsContainer;
