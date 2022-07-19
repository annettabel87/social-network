import React from 'react';
import { Dispatch, EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IActionType, IDialogsState, IProfileState, IUser, IUsersState } from '../../interfaces';
import {
  setCurrentPageCreator,
  setUsersCountCreator,
  setUsersCreator,
  toggleFollowCreator,
} from '../../redux/usersReducer';
import axios from 'axios';
import Users from './Users';

export interface IUsersContainerComponentProps {
  state: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  toggleFollow: (userId: number) => void;
  setUsers: (users: IUser[]) => void;
  setCurrentPage: (page: number) => void;
  setUsersCount: (usersCount: number) => void;
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

class UsersContainerComponent extends React.Component<IUsersContainerComponentProps> {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setUsersCount(response.data.totalCount);
      });
  }
  onChangedPage = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <Users
        state={this.props.state}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        usersCount={this.props.usersCount}
        toggleFollow={this.props.toggleFollow}
        onChangedPage={this.onChangedPage}
      />
    );
  }
}
const UsersContainer = connect(mapState, mapDispatch)(UsersContainerComponent);
export default UsersContainer;
