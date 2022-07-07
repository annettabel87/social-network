import React, { FC } from 'react';
import { IDialogsProps } from '../../interfaces';
import { updateNewMessageCreator, sendMessagetCreator } from '../../redux/dialogsReducer';
import Dialog from './Dialog/Dialog';
import s from './Dialogs.module.scss';
import Message from './Message/Message';

const Dialogs: FC<IDialogsProps> = (props) => {
  const dialogElements = props.state.dialogs.map((dialog) => (
    <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />
  ));
  const messageElements = props.state.messages.map((message) => (
    <Message text={message.message} key={message.id} />
  ));
  const onChangeMessageText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const body = e.target ? e.target.value : '';
    props.dispatch(updateNewMessageCreator(body));
  };
  const sendMessage = () => {
    props.dispatch(sendMessagetCreator());
  };
  return (
    <section className={s.dialogs}>
      <div className={s.dialogsWrapper}>
        <h3 className={s.title}>Dialogs</h3>
        {dialogElements}
      </div>
      <div className={s.messagesWrapper}>
        <h3 className={s.title}>Name</h3>
        <div className={s.messageBlock}>{messageElements}</div>
        <div className={s.newMessage}>
          <textarea
            className={s.newMessageInput}
            placeholder="input your message"
            value={props.state.newMessageBody}
            onChange={onChangeMessageText}
          ></textarea>
          <button className={s.btn} onClick={sendMessage}>
            send
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dialogs;
