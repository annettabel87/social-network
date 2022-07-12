import React, { FC } from 'react';
import { IAppPops } from '../../../interfaces';
import { addPostCreator, updateNewTextCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

const MyPostsContainer: FC<IAppPops> = (props) => {
  const state = props.store.getState();
  const addPost = () => {
    props.store.dispatch(addPostCreator());
  };
  const postChange = (text: string) => {
    props.store.dispatch(updateNewTextCreator(text));
  };
  return (
    <MyPosts
      addPost={addPost}
      updateNewTextCreator={postChange}
      posts={state.profileReducer.posts}
      newPostText={state.profileReducer.newPostText}
    />
  );
};

export default MyPostsContainer;
