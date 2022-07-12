import React, { FC } from 'react';
import { IAppPops } from '../../interfaces';
import { updateNewMessageCreator, sendMessagetCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

const DialogsContainer: FC<IAppPops> = (props) => {
  const state = props.store.getState();

  const onChangeMessageText = (body: string) => {
    props.store.dispatch(updateNewMessageCreator(body));
  };
  const sendMessage = () => {
    props.store.dispatch(sendMessagetCreator());
  };
  return (
    <Dialogs
      state={state.dialogsReducer}
      sendMessage={sendMessage}
      updateNewMessage={onChangeMessageText}
    />
  );
};

export default DialogsContainer;
