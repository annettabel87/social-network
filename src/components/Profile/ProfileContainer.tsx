import React, { JSXElementConstructor } from 'react';
import { EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IDialogsState, IProfile, IProfileState, IUsersState } from '../../interfaces';
import Profile from './Profile';
import axios from 'axios';
import { setUserProfile } from '../../redux/profileReducer';
import { Params, useParams } from 'react-router-dom';

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
export interface IProfileContainerComponentProps {
  state: IProfileState;
  setUserProfile: (profile: IProfile) => void;
}
export const withRouter = (Children: JSXElementConstructor<IWithRouterProps>) => {
  return (props: IProfileContainerComponentProps) => {
    const match = { params: useParams() };
    return <Children {...props} params={match.params} />;
  };
};
export interface IWithRouterProps {
  state: IProfileState;
  setUserProfile: (profile: IProfile) => void;
  params: Readonly<Params<string>>;
}
class ProfileContainerComponent extends React.Component<IWithRouterProps> {
  componentDidMount() {
    const userId = this.props.params.useId ? this.props.params.useId : '2';
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then((response) => {
      this.props.setUserProfile(response.data);
    });
  }
  render() {
    return <Profile {...this.props} profile={this.props.state.profile} />;
  }
}

const ProfileWithRouter = withRouter(ProfileContainerComponent);
const ProfileContainer = connect(mapState, { setUserProfile })(ProfileWithRouter);

export default ProfileContainer;
