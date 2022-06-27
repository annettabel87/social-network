import React, { FC } from 'react';
import avatar from '../../assets/ava.jpg';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';

const Profile: FC = () => {
  return (
    <section className={s.profile}>
      <div className={s.info}>
        <div className={s.ava}>
          <img alt="avatar" src={avatar} className={s.avatarImg} />
        </div>
        <div className={s.description}>
          <p>Anna Repeshko</p>
          <p>Russia</p>
        </div>
      </div>
      <MyPosts />
    </section>
  );
};

export default Profile;
