import React, { FC } from 'react';
import { updateNewMessageCreator, sendMessagetCreator } from '../../redux/dialogsReducer';
import StoreContext from '../../storeContext';
import Dialogs from './Dialogs';

const DialogsContainer: FC = () => {
  return (
    <StoreContext.Consumer>
      {(value) => {
        const onChangeMessageText = (body: string) => {
          value.dispatch(updateNewMessageCreator(body));
        };
        const sendMessage = () => {
          value.dispatch(sendMessagetCreator());
        };
        return (
          <Dialogs
            state={value.getState().dialogsReducer}
            sendMessage={sendMessage}
            updateNewMessage={onChangeMessageText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default DialogsContainer;
