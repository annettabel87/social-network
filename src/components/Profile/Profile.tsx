import React, { FC } from 'react';
import { IProfileProps } from '../../interfaces';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile: FC<IProfileProps> = (props) => {
  return (
    <section className={s.profile}>
      <ProfileInfo />
      <MyPosts state={props.state} dispatch={props.dispatch} />
    </section>
  );
};

export default Profile;
