import React, { FC } from 'react';
import { IPost } from '../../redux/state';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';

interface IProfileProps {
  state: {
    posts: IPost[];
  };
}
const Profile: FC<IProfileProps> = (props) => {
  return (
    <section className={s.profile}>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} />
    </section>
  );
};

export default Profile;
