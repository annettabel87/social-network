import React, { JSXElementConstructor } from 'react';
import { EmptyObject } from 'redux';
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

class ProfileContainerComponent extends React.Component<IWithRouterProps> {
  componentDidMount() {
    const userId = this.props.params.useId ? this.props.params.useId : '2';
    this.props.getUserPage(+userId);
  }
  render() {
    return <Profile {...this.props} profile={this.props.state.profile} />;
  }
}

const ProfileWithRouter = withRouter(ProfileContainerComponent);
const ProfileContainer = connect(mapState, { getUserPage })(ProfileWithRouter);

export default ProfileContainer;
