import React, { FC } from 'react';
import { IUsersProps } from '../../interfaces';
import s from './Users.module.scss';
import User from './User';
import Paginator from '../../common/Paginator/Paginator';

const Users: FC<IUsersProps> = ({
  state,
  usersCount,
  pageSize,
  currentPage,
  onChangedPage,
  toggleFollow,
  followingInProgress,
}: IUsersProps) => {
  return (
    <div className={s.usersPage}>
      <Paginator
        items={usersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangedPage={onChangedPage}
      />
      {state.map((user) => (
        <User
          key={user.id}
          user={user}
          followingInProgress={followingInProgress}
          toggleFollow={toggleFollow}
        />
      ))}
    </div>
  );
};

export default Users;
