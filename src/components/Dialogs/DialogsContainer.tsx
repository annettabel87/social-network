import { Dispatch, EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { IActionType, IDialogsState, IProfileState } from '../../interfaces';
import { updateNewMessageCreator, sendMessagetCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

const mapState = (
  state: EmptyObject & {
    dialogsReducer: IDialogsState;
    profileReducer: IProfileState;
  }
) => {
  return {
    state: state.dialogsReducer,
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
