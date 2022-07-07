import React, { FC } from 'react';
import avatar from '../../../../assets/ava.jpg';
import { IPostProps } from '../../../../interfaces';
import s from './Post.module.scss';

const Post: FC<IPostProps> = (props) => {
  return (
    <div className={s.post}>
      <img src={avatar} alt="avatar" />
      <div className={s.text}>{props.message}</div>
      <div className={s.likeWrapper}>
        <div className={s.likeCount}>{props.likeCount}</div>
        <button className={s.like}></button>
      </div>
    </div>
  );
};

export default Post;
