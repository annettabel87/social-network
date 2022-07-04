import React, { FC } from 'react';
import avatar from '../../../assets/ava.jpg';
import { IPost } from '../../../redux/state';
import s from './MyPosts.module.scss';
import Post from './Post/Post';

interface IMyPostsprops {
  state: {
    posts: IPost[];
    newPostText: string;
  };
  addPost: () => void;
  updateNewPosText: (newText: string) => void;
}
const MyPosts: FC<IMyPostsprops> = (props) => {
  const postElements = props.state.posts.map((post) => (
    <Post message={post.post} key={post.id} likeCount={post.likeCount} />
  ));
  const newPostElement = React.createRef<HTMLTextAreaElement>();
  const addPost = () => {
    props.addPost();
  };
  const onPostChange = () => {
    const text = newPostElement.current ? newPostElement.current.value : '';
    props.updateNewPosText(text);
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
          value={props.state.newPostText}
        />
        <button className={s.btn} onClick={addPost}>
          +
        </button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
