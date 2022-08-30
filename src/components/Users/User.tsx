import React, { FC } from 'react';
import { IUserProps } from '../../interfaces';
import s from './Users.module.scss';
import userPhoto from '../../assets/user.png';
import { NavLink } from 'react-router-dom';

const User: FC<IUserProps> = React.memo(
  ({ user, followingInProgress, toggleFollow }: IUserProps) => {
    return (
      <div className={s.userWrapper} key={user.id}>
        <div className={s.avatarBlock}>
          <NavLink to={`/profile/${user.id}`}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              alt="avatar"
              className={s.avatarIcon}
            />
          </NavLink>
        </div>
        <div className={s.userInfo}>
          <p className={s.mainText}>{user.name}</p>
          <p className={s.text}>{user.status}</p>
          <button
            disabled={followingInProgress.some((id) => id === user.id)}
            className={user.followed ? `${s.btn} ${s.follow}` : `${s.btn} ${s.unfollow}`}
            onClick={() => {
              toggleFollow(user.id, user.followed);
            }}
          >
            {user.followed ? 'unfollow' : 'follow'}
          </button>
        </div>
      </div>
    );
  }
);

export default User;
