import React, { FC } from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo, { IProfileProps } from './ProfileInfo/ProfileInfo';
import s from './Profile.module.scss';

const Profile: FC<IProfileProps> = (props) => {
  return (
    <section className={s.profile}>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </section>
  );
};

export default Profile;
