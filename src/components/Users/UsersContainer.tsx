import React from 'react';
import { Dispatch, EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IActionType, IDialogsState, IProfileState, IUser, IUsersState } from '../../interfaces';
import {
  setCurrentPageCreator,
  setUsersCountCreator,
  setUsersCreator,
  toggleFollowCreator,
  toggleIsFetchingCreator,
} from '../../redux/usersReducer';
import axios from 'axios';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';

export interface IUsersContainerComponentProps {
  state: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  isFetching: boolean;
  toggleFollow: (userId: number) => void;
  setUsers: (users: IUser[]) => void;
  setCurrentPage: (page: number) => void;
  setUsersCount: (usersCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
}

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
    isFetching: state.usersReducer.isFetching,
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
    toggleIsFetching: (isFetching: boolean) => {
      dispatch(toggleIsFetchingCreator(isFetching));
    },
  };
};

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
const UsersContainer = connect(mapState, mapDispatch)(UsersContainerComponent);
export default UsersContainer;
