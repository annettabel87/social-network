import { ThunkAction } from 'redux-thunk';
import { userAPI } from '../API/Api';
import { IActionType, IFilterData, IGetUsersData, IUser, IUsersState } from '../interfaces';
import { RootState } from './reduxStore';

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';
const SET_FILTER = 'SET_FILTER';

export const toggleFollow = (userId: number) => ({
  type: TOGGLE_FOLLOW,
  userId,
});
export const toggleIsFollowingInProgress = (userId: number, isFetching: boolean) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  userId,
  isFetching,
});

export const setUsers = (users: IUser[]) => ({
  type: SET_USERS,
  users,
});
export const setUsersCount = (usersCount: number) => ({
  type: SET_USERS_COUNT,
  usersCount,
});
export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const toggleIsFetching = (isFetching: boolean) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const setFilter = (filter: IFilterData) => ({
  type: TOGGLE_IS_FETCHING,
  filter,
});

const initialState: IUsersState = {
  users: [],
  pageSize: 5,
  currentPage: 1,
  usersCount: 0,
  isFetching: true,
  followingInProgress: [],
  filter: {
    term: '',
    friend: null,
  },
};
const usersReducer = (state: IUsersState = initialState, action: IActionType) => {
  switch (action.type) {
    case TOGGLE_FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
    }

    case SET_USERS: {
      return {
        ...state,
        users: action.users ? action.users : [],
      };
    }

    case SET_USERS_COUNT: {
      return {
        ...state,
        usersCount: action.usersCount,
      };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }

    case TOGGLE_FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== (action.userId ? action.userId : null)),
      };
    }

    case SET_FILTER: {
      return {
        ...state,
        filter: action.filter,
      };
    }

    default:
      return state;
  }
};
export const requestUsers = (
  currentPage: number,
  pageSize: number,
  filter: IFilterData
): ThunkAction<void, RootState, unknown, IActionType> => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const response: IGetUsersData = await userAPI.getUsers(currentPage, pageSize, filter);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setUsersCount(response.totalCount));
    dispatch(setCurrentPage(currentPage));
    dispatch(setFilter(filter));
  };
};
export const toggleFollowThunk = (
  userId: number,
  userFollowed: boolean
): ThunkAction<void, RootState, unknown, IActionType> => {
  return async (dispatch) => {
    if (!userFollowed) {
      dispatch(toggleIsFollowingInProgress(userId, true));
      const response = await userAPI.followUser(userId);
      if (response.resultCode == 0) {
        dispatch(toggleFollow(userId));
      }
      dispatch(toggleIsFollowingInProgress(userId, false));
    } else {
      dispatch(toggleIsFollowingInProgress(userId, true));
      const response = await userAPI.unfollowUser(userId);
      if (response.resultCode == 0) {
        dispatch(toggleFollow(userId));
      }
      dispatch(toggleIsFollowingInProgress(userId, false));
    }
  };
};
export default usersReducer;
