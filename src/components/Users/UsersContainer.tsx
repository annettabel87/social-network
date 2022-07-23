import React from 'react';
import { EmptyObject } from 'redux';
import { connect } from 'react-redux';
import {
  IAuthState,
  IDialogsState,
  IProfileState,
  IUsersContainerComponentProps,
  IUsersState,
} from '../../interfaces';
import {
  setCurrentPage,
  setUsersCount,
  setUsers,
  toggleFollow,
  toggleIsFetching,
} from '../../redux/usersReducer';
import axios from 'axios';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
    usersReducer: IUsersState;
    authReducer: IAuthState;
  }
) => {
  return {
    state: state.usersReducer.users,
    pageSize: state.usersReducer.pageSize,
    currentPage: state.usersReducer.currentPage,
    usersCount: state.usersReducer.usersCount,
    isFetching: state.usersReducer.isFetching,
  };
};

// const mapDispatch = (dispatch: Dispatch<IActionType>) => {
//   return {
//     toggleFollow: (userId: number) => {
//       dispatch(toggleFollowCreator(userId));
//     },
//     setUsers: (users: IUser[]) => {
//       dispatch(setUsersCreator(users));
//     },
//     setCurrentPage: (page: number) => {
//       dispatch(setCurrentPageCreator(page));
//     },
//     setUsersCount: (usersCount: number) => {
//       dispatch(setUsersCountCreator(usersCount));
//     },
//     toggleIsFetching: (isFetching: boolean) => {
//       dispatch(toggleIsFetchingCreator(isFetching));
//     },
//   };
// };

class UsersContainerComponent extends React.Component<IUsersContainerComponentProps> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setUsersCount(response.data.totalCount);
      });
  }
  onChangedPage = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            state={this.props.state}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            usersCount={this.props.usersCount}
            toggleFollow={this.props.toggleFollow}
            onChangedPage={this.onChangedPage}
          />
        )}
      </>
    );
  }
}
const UsersContainer = connect(mapState, {
  setCurrentPage,
  setUsersCount,
  setUsers,
  toggleFollow,
  toggleIsFetching,
})(UsersContainerComponent);
export default UsersContainer;
