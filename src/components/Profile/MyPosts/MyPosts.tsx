import React, { FC } from 'react';
import avatar from '../../../assets/ava.jpg';
import { IMyPostsprops } from '../../../interfaces';
import Post from './Post/Post';
import s from './MyPosts.module.scss';

const MyPosts: FC<IMyPostsprops> = (props) => {
  const postElements = props.posts.map((post) => (
    <Post message={post.post} key={post.id} likeCount={post.likeCount} />
  ));
  const newPostElement = React.createRef<HTMLTextAreaElement>();
  const onAddPost = () => {
    props.addPost();
  };
  const onPostChange = () => {
    const text = newPostElement.current ? newPostElement.current.value : '';
    props.updateNewTextCreator(text);
  };
  return (
    <div className={s.myPosts}>
      <div className={s.createPost}>
        <img src={avatar} alt="avatar" className={s.avatarIcon} />
        <textarea
          name="newPost"
          className={s.newPost}
          ref={newPostElement}
          onChange={onPostChange}
          value={props.newPostText}
        />
        <button className={s.btn} onClick={onAddPost}>
          +
        </button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
