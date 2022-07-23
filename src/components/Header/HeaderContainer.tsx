import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { EmptyObject } from 'redux';
import {
  IAuthContainerProps,
  IAuthState,
  IDialogsState,
  IProfileState,
  IUsersState,
} from '../../interfaces';
import { setUserData, toggleIsFetching } from '../../redux/authReducer';
import Header from './Header';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
    usersReducer: IUsersState;
    authReducer: IAuthState;
  }
) => {
  return {
    id: state.authReducer.id,
    email: state.authReducer.email,
    login: state.authReducer.login,
    isFetching: state.authReducer.isFetching,
    isAuth: state.authReducer.isAuth,
  };
};

class HeaderContainerComponent extends React.Component<IAuthContainerProps> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          this.props.setUserData(response.data.data);
        }
        this.props.toggleIsFetching(false);
      });
  }
  render() {
    return <Header {...this.props} />;
  }
}
const HeaderContainer = connect(mapState, { setUserData, toggleIsFetching })(
  HeaderContainerComponent
);
export default HeaderContainer;
