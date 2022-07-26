import React, { FC } from 'react';
import { IUser } from '../../interfaces';
import s from './Users.module.scss';
import userPhoto from '../../assets/user.png';
import { NavLink } from 'react-router-dom';
import { userAPI } from '../../API/Api';

export interface IUsersProps {
  state: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  toggleFollow: (userId: number) => void;
  onChangedPage: (page: number) => void;
}
const Users: FC<IUsersProps> = (props: IUsersProps) => {
  const pagesCount = Math.ceil(props.usersCount / props.pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const curP = props.currentPage;
  const curPF = curP - 5 < 0 ? 0 : curP - 5;
  const curPL = curP + 5;
  const slicedPages = pages.slice(curPF, curPL);

  return (
    <div className={s.usersPage}>
      <div className={s.paginationWrapper}>
        {slicedPages.map((p) => {
          return (
            <button
              key={p}
              className={
                props.currentPage === p ? `${s.paginationBtn} ${s.selectedPage}` : s.paginationBtn
              }
              onClick={() => props.onChangedPage(p)}
            >
              {p}
            </button>
          );
        })}
      </div>
      {props.state.map((user) => (
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
              className={user.followed ? `${s.btn} ${s.follow}` : `${s.btn} ${s.unfollow}`}
              onClick={() => {
                if (!user.followed) {
                  userAPI.followUser(user.id).then((response) => {
                    if (response.resultCode == 0) {
                      props.toggleFollow(user.id);
                    }
                  });
                } else {
                  userAPI.unfollowUser(user.id).then((response) => {
                    if (response.resultCode == 0) {
                      props.toggleFollow(user.id);
                    }
                  });
                }
              }}
            >
              {user.followed ? 'unfollow' : 'follow'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
