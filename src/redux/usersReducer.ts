import { Dispatch } from 'redux';
import { userAPI } from '../API/Api';
import { IActionType, IGetUsersData, IUser, IUsersState } from '../interfaces';

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

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

const initialState: IUsersState = {
  users: [],
  pageSize: 5,
  currentPage: 1,
  usersCount: 0,
  isFetching: true,
  followingInProgress: [],
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

    default:
      return state;
  }
};
export const requestUsers = (currentPage: number, pageSize: number) => {
  return (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    userAPI.getUsers(currentPage, pageSize).then((response: IGetUsersData) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.items));
      dispatch(setUsersCount(response.totalCount));
      dispatch(setCurrentPage(currentPage));
    });
  };
};
export const toggleFollowThunk = (userId: number, userFollowed: boolean) => {
  return (dispatch: Dispatch) => {
    if (!userFollowed) {
      dispatch(toggleIsFollowingInProgress(userId, true));
      userAPI.followUser(userId).then((response) => {
        if (response.resultCode == 0) {
          dispatch(toggleFollow(userId));
        }
        dispatch(toggleIsFollowingInProgress(userId, false));
      });
    } else {
      dispatch(toggleIsFollowingInProgress(userId, true));
      userAPI.unfollowUser(userId).then((response) => {
        if (response.resultCode == 0) {
          dispatch(toggleFollow(userId));
        }
        dispatch(toggleIsFollowingInProgress(userId, false));
      });
    }
  };
};
export default usersReducer;
