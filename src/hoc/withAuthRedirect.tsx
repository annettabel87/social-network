import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { EmptyObject } from 'redux';
import { IAuthState, IMapStateAuth } from '../interfaces';

const mapState = (
  state: EmptyObject & {
    authReducer: IAuthState;
  }
) => {
  return {
    isAuth: state.authReducer.isAuth,
  };
};

export const withAuthRedirect = (Component: ComponentType) => {
  const RedirectComponent = (props: IMapStateAuth) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return <Component {...restProps} />;
  };
  const ConnectedAuthRedirectComponent = connect(mapState)(RedirectComponent);
  return ConnectedAuthRedirectComponent;
};
