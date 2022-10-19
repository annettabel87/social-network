import { FC, useEffect } from 'react';
import { IActionType, IFilterData } from '../../interfaces';
import s from './Users.module.scss';
import User from './User';
import Paginator from '../../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import {
  getFilter,
  getFollowingInProgress,
  getPage,
  getPageSize,
  getUsers,
  getUsersCount,
} from '../../redux/usersSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { requestUsers, toggleFollowThunk } from '../../redux/usersReducer';
import { RootState } from '../../redux/reduxStore';
import { ThunkDispatch } from 'redux-thunk';

const Users: FC = () => {
  const usersCount = useSelector(getUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getPage);
  const users = useSelector(getUsers);
  const followingInProgress = useSelector(getFollowingInProgress);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, IActionType>>();
  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);
  const onChangedPage = (pageNumber: number): void => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onSetFilter = (filter: IFilterData) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const toggleFollow = (userId: number, userFollowed: boolean) => {
    dispatch(toggleFollowThunk(userId, userFollowed));
  };
  return (
    <div className={s.usersPage}>
      <UsersSearchForm onSetFilter={onSetFilter} />
      <Paginator
        items={usersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangedPage={onChangedPage}
      />
      {users.map((user) => (
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
