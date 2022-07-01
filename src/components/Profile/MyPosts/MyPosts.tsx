import React, { FC } from 'react';
import avatar from '../../../assets/ava.jpg';
import { IPost } from '../../../redux/state';
import s from './MyPosts.module.scss';
import Post from './Post/Post';

interface IMyPostsprops {
  posts: IPost[];
}
const MyPosts: FC<IMyPostsprops> = (props) => {
  const postElements = props.posts.map((post) => (
    <Post message={post.post} key={post.id} likeCount={post.likeCount} />
  ));
  return (
    <div className={s.myPosts}>
      <div className={s.createPost}>
        <img src={avatar} alt="avatar" className={s.avatarIcon} />
        <textarea name="newPost" className={s.newPost} />
        <button className={s.btn}>+</button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
