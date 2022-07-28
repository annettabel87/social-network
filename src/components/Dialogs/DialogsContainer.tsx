import { Dispatch, EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IActionType, IAuthState, IDialogsState, IProfileState } from '../../interfaces';
import { updateNewMessageCreator, sendMessagetCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

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
const DialogsContainer = connect(mapState, mapDispatch)(Dialogs);
export default DialogsContainer;
