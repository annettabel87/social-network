import { connect } from 'react-redux';
import { EmptyObject, Dispatch } from 'redux';
import { IDialogsState, IProfileState, IActionType } from '../../../interfaces';
import { addPostCreator } from '../../../redux/profileReducer';

import MyPosts from './MyPosts';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
  }
) => {
  return {
    posts: state.profileReducer.posts,
  };
};

const mapDispatch = (dispatch: Dispatch<IActionType>) => {
  return {
    addPost: (postText: string) => {
      dispatch(addPostCreator(postText));
    },
  };
};
const MyPostsContainer = connect(mapState, mapDispatch)(MyPosts);
export default MyPostsContainer;
