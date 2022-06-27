import React, { FC } from 'react';
import avatar from '../../../assets/ava.jpg';
import s from './MyPosts.module.scss';
import Post from './Post/Post';

const MyPosts: FC = () => {
  return (
    <div className={s.myPosts}>
      <div className={s.createPost}>
        <img src={avatar} alt="avatar" className={s.avatarIcon} />
        <textarea name="newPost" className={s.newPost} />
        <button className={s.btn}>+</button>
      </div>
      <div className={s.posts}>
        <Post message="Hello" />
        <Post message="My post 1" />
        <Post message="My post 2" />
        <Post message="My post 3" />
      </div>
    </div>
  );
};

export default MyPosts;
