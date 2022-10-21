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
import { useSearchParams } from 'react-router-dom';
type QueryParamsType = { term?: string; page?: string; friend?: string };
const Users: FC = () => {
  const usersCount = useSelector(getUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getPage);
  const users = useSelector(getUsers);
  const followingInProgress = useSelector(getFollowingInProgress);
  const filter = useSelector(getFilter);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, IActionType>>();

  useEffect(() => {
    let actualPage = currentPage;
    let actualFilter = filter;

    if (searchParams.has('page')) {
      actualPage = +(searchParams.get('page') as string);
    }
    if (searchParams.has('term')) {
      actualFilter = { ...actualFilter, term: searchParams.get('term') as string };
    }
    switch (searchParams.get('friend')) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };
        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    setSearchParams(query);
  }, [filter, currentPage]);
  const onChangedPage = (pageNumber: number): void => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onSetFilter = (filterData: IFilterData) => {
    dispatch(requestUsers(1, pageSize, filterData));
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
