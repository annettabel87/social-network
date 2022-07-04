import React, { FC } from 'react';
import { IPost } from '../../redux/state';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';

interface IProfileProps {
  state: {
    posts: IPost[];
    newPostText: string;
  };
  addPost: () => void;
  updateNewPosText: (newText: string) => void;
}
const Profile: FC<IProfileProps> = (props) => {
  return (
    <section className={s.profile}>
      <ProfileInfo />
      <MyPosts
        state={props.state}
        addPost={props.addPost}
        updateNewPosText={props.updateNewPosText}
      />
    </section>
  );
};

export default Profile;
