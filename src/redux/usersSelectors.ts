import { EmptyObject } from 'redux';
import { IUsersState } from '../interfaces';

export const getUsers = (state: EmptyObject & { usersReducer: IUsersState }) => {
  return state.usersReducer.users;
};
export const getPageSize = (state: EmptyObject & { usersReducer: IUsersState }) => {
  return state.usersReducer.pageSize;
};

export const getPage = (state: EmptyObject & { usersReducer: IUsersState }) => {
  return state.usersReducer.pageSize;
};

export const getUsersCount = (state: EmptyObject & { usersReducer: IUsersState }) => {
  return state.usersReducer.usersCount;
};

export const getIsFetching = (state: EmptyObject & { usersReducer: IUsersState }) => {
  return state.usersReducer.isFetching;
};

export const getFollowingInProgress = (state: EmptyObject & { usersReducer: IUsersState }) => {
  return state.usersReducer.followingInProgress;
};
