import React, { FC } from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import s from './Profile.module.scss';
import { IProfileProps } from '../../interfaces';

const Profile: FC<IProfileProps> = (props) => {
  return (
    <section className={s.profile}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </section>
  );
};

export default Profile;
