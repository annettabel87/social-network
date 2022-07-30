import { compose, Dispatch, EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IActionType, IAuthState, IDialogsState, IProfileState } from '../../interfaces';
import { updateNewMessageCreator, sendMessagetCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
    authReducer: IAuthState;
  }
) => {
  return {
    state: state.dialogsReducer,
    isAuth: state.authReducer.isAuth,
  };
};

const mapDispatch = (dispatch: Dispatch<IActionType>) => {
  return {
    sendMessage: () => {
      dispatch(sendMessagetCreator());
    },
    updateNewMessage: (body: string) => {
      dispatch(updateNewMessageCreator(body));
    },
  };
};

export default compose<React.ComponentType>(
  connect(mapState, mapDispatch),
  withAuthRedirect
)(Dialogs);
