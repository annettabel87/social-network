import React, { JSXElementConstructor } from 'react';
import { EmptyObject, compose } from 'redux';
import { connect } from 'react-redux';
import {
  IDialogsState,
  IProfileContainerComponentProps,
  IProfileState,
  IUsersState,
  IWithRouterProps,
} from '../../interfaces';
import Profile from './Profile';
import { getStatus, getUserPage, updateStatus } from '../../redux/profileReducer';
import { useParams } from 'react-router-dom';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
    usersReducer: IUsersState;
  }
) => {
  return {
    state: state.profileReducer,
    profile: state.profileReducer.profile,
    status: state.profileReducer.status,
  };
};

export const withRouter = (Children: JSXElementConstructor<IWithRouterProps>) => {
  return (props: IProfileContainerComponentProps) => {
    const match = { params: useParams() };
    return <Children {...props} params={match.params} />;
  };
};

class ProfileContainer extends React.Component<IWithRouterProps> {
  componentDidMount() {
    const userId = this.props.params.useId ? this.props.params.useId : '2';
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
