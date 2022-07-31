import React, { FC } from 'react';
import Preloader from '../../../common/Preloader/Preloader';
import { IProfile } from '../../../interfaces';
import userPhoto from '../../../assets/user.png';
import s from './ProfileInfo.module.scss';
import ProfileStatus from './ProfileStatus';

export interface IProfileProps {
  profile: IProfile | null;
}
const ProfileInfo: FC<IProfileProps> = (props) => {
  if (!props.profile) {
    return <Preloader />;
  } else {
    return (
      <div className={s.info}>
        <div className={s.ava}>
          <img
            alt="avatar"
            src={props.profile.photos.large ? props.profile.photos.large : userPhoto}
            className={s.avatarImg}
          />
        </div>
        <div className={s.description}>
          <p>{props.profile.fullName}</p>
          <ProfileStatus status=" Hello" />
          <p>about Me: {props.profile.aboutMe}</p>
        </div>
      </div>
    );
  }
};

export default ProfileInfo;
