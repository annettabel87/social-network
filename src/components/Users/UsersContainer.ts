import { Dispatch, EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IActionType, IDialogsState, IProfileState, IUser, IUsersState } from '../../interfaces';
import {
  setCurrentPageCreator,
  setUsersCountCreator,
  setUsersCreator,
  toggleFollowCreator,
} from '../../redux/usersReducer';
import Users from './Users';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
    usersReducer: IUsersState;
  }
) => {
  return {
    state: state.usersReducer.users,
    pageSize: state.usersReducer.pageSize,
    currentPage: state.usersReducer.currentPage,
    usersCount: state.usersReducer.usersCount,
  };
};

const mapDispatch = (dispatch: Dispatch<IActionType>) => {
  return {
    toggleFollow: (userId: number) => {
      dispatch(toggleFollowCreator(userId));
    },
    setUsers: (users: IUser[]) => {
      dispatch(setUsersCreator(users));
    },
    setCurrentPage: (page: number) => {
      dispatch(setCurrentPageCreator(page));
    },
    setUsersCount: (usersCount: number) => {
      dispatch(setUsersCountCreator(usersCount));
    },
  };
};
const UsersContainer = connect(mapState, mapDispatch)(Users);
export default UsersContainer;
