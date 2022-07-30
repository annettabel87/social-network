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
import { getUserPage } from '../../redux/profileReducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

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
  }
  render() {
    return <Profile {...this.props} profile={this.props.state.profile} />;
  }
}

export default compose<React.ComponentType>(
  connect(mapState, { getUserPage }),
  withAuthRedirect,
  withRouter
)(ProfileContainer);
