import React from 'react';
import { EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IFilterData, IUsersContainerComponentProps, IUsersState } from '../../interfaces';
import {
  toggleFollow,
  toggleIsFetching,
  toggleIsFollowingInProgress,
  requestUsers,
  toggleFollowThunk,
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {
  getFilter,
  getFollowingInProgress,
  getIsFetching,
  getPage,
  getPageSize,
  getUsers,
  getUsersCount,
} from '../../redux/usersSelectors';

const mapState = (
  state: EmptyObject & {
    usersReducer: IUsersState;
  }
) => {
  return {
    state: getUsers(state),
    pageSize: getPageSize(state),
    currentPage: getPage(state),
    usersCount: getUsersCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getFilter(state),
  };
};

class UsersContainerComponent extends React.Component<IUsersContainerComponentProps> {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
  }
  onChangedPage = (pageNumber: number) => {
    this.props.requestUsers(pageNumber, this.props.pageSize, this.props.filter);
  };
  onSetFilter = (filter: IFilterData) => {
    this.props.requestUsers(1, this.props.pageSize, filter);
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
            onSetFilter={this.onSetFilter}
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
  requestUsers,
  toggleFollowThunk,
})(UsersContainerComponent);
export default UsersContainer;
