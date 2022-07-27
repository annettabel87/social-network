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
  toggleFollow,
  toggleIsFetching,
  toggleIsFollowingInProgress,
  getUsers,
  toggleFollowThunk,
} from '../../redux/usersReducer';
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
    followingInProgress: state.usersReducer.followingInProgress,
  };
};

class UsersContainerComponent extends React.Component<IUsersContainerComponentProps> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onChangedPage = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
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
            toggleFollow={this.props.toggleFollowThunk}
            onChangedPage={this.onChangedPage}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}
const UsersContainer = connect(mapState, {
  toggleFollow,
  toggleIsFetching,
  toggleIsFollowingInProgress,
  getUsers,
  toggleFollowThunk,
})(UsersContainerComponent);
export default UsersContainer;
