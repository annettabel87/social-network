import React, { FC } from 'react';
import avatar from '../../../assets/ava.jpg';
import s from './ProfileInfo.module.scss';

const ProfileInfo: FC = () => {
  return (
    <div className={s.info}>
      <div className={s.ava}>
        <img alt="avatar" src={avatar} className={s.avatarImg} />
      </div>
      <div className={s.description}>
        <p>Anna Repeshko</p>
        <p>Russia</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
