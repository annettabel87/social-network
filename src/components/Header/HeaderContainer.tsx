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
import { getAuthInfo, logOut } from '../../redux/authReducer';
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
    this.props.getAuthInfo();
  }
  render() {
    return <Header {...this.props} />;
  }
}
const HeaderContainer = connect(mapState, { getAuthInfo, logOut })(HeaderContainerComponent);
export default HeaderContainer;
