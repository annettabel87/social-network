import React, { FC } from 'react';
import avatar from '../../../../assets/ava.jpg';
import s from './Post.module.scss';

interface IPostProps {
  message: string;
}

const Post: FC<IPostProps> = (props) => {
  return (
    <div className={s.post}>
      <img src={avatar} alt="avatar" />
      <div className={s.text}>{props.message}</div>
      <button className={s.like}></button>
    </div>
  );
};

export default Post;
