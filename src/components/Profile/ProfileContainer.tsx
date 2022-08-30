import React, { JSXElementConstructor } from 'react';
import { EmptyObject, compose } from 'redux';
import { connect } from 'react-redux';
import {
  IAuthState,
  IProfileContainerComponentProps,
  IProfileState,
  IWithRouterProps,
} from '../../interfaces';
import Profile from './Profile';
import { getStatus, getUserPage, updateStatus } from '../../redux/profileReducer';
import { useParams, useNavigate } from 'react-router-dom';

const mapState = (
  state: EmptyObject & {
    profileReducer: IProfileState;
    authReducer: IAuthState;
  }
) => {
  return {
    state: state.profileReducer,
    profile: state.profileReducer.profile,
    status: state.profileReducer.status,
    authorizedUserId: state.authReducer.id,
  };
};

export const withRouter = (Children: JSXElementConstructor<IWithRouterProps>) => {
  return (props: IProfileContainerComponentProps) => {
    const match = { params: useParams() };
    const navigate = useNavigate();
    return <Children {...props} params={match.params} navigate={navigate} />;
  };
};

class ProfileContainer extends React.Component<IWithRouterProps> {
  componentDidMount() {
    let userId = this.props.state.profile?.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.navigate('/login');
      }
    }
    this.props.getUserPage(+userId);
    this.props.getStatus(+userId);
  }
  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.state.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}

export default compose<React.ComponentType>(
  connect(mapState, { getUserPage, getStatus, updateStatus }),
  withRouter
)(ProfileContainer);
