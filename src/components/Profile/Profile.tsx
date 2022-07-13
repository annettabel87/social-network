import React, { FC } from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import s from './Profile.module.scss';

const Profile: FC = () => {
  return (
    <section className={s.profile}>
      <ProfileInfo />
      <MyPostsContainer />
    </section>
  );
};

export default Profile;
