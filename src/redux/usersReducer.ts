import { IActionType, IUser, IUsersState } from '../interfaces';

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export const toggleFollow = (userId: number) => ({
  type: TOGGLE_FOLLOW,
  userId,
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

    default:
      return state;
  }
};

export default usersReducer;
