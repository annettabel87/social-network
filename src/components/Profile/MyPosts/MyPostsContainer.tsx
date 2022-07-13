import React, { FC } from 'react';
import { addPostCreator, updateNewTextCreator } from '../../../redux/profileReducer';
import StoreContext from '../../../storeContext';
import MyPosts from './MyPosts';

const MyPostsContainer: FC = () => {
  return (
    <StoreContext.Consumer>
      {(value) => {
        const addPost = () => {
          value.dispatch(addPostCreator());
        };
        const postChange = (text: string) => {
          value.dispatch(updateNewTextCreator(text));
        };
        return (
          <MyPosts
            addPost={addPost}
            updateNewTextCreator={postChange}
            posts={value.getState().profileReducer.posts}
            newPostText={value.getState().profileReducer.newPostText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default MyPostsContainer;
