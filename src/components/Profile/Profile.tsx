import React, { FC } from 'react';
import { IAppPops } from '../../interfaces';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import s from './Profile.module.scss';

const Profile: FC<IAppPops> = (props) => {
  return (
    <section className={s.profile}>
      <ProfileInfo />
      <MyPostsContainer store={props.store} />
    </section>
  );
};

export default Profile;
