import React, { FC } from 'react';
import { IDialog, IMessage } from '../../redux/state';
import Dialog from './Dialog/Dialog';
import s from './Dialogs.module.scss';
import Message from './Message/Message';

interface IDialogsProps {
  state: {
    dialogs: IDialog[];
    messages: IMessage[];
  };
}
const Dialogs: FC<IDialogsProps> = (props) => {
  const dialogElements = props.state.dialogs.map((dialog) => (
    <Dialog id={dialog.id.toString()} name={dialog.name} key={dialog.id} />
  ));
  const messageElements = props.state.messages.map((message) => (
    <Message text={message.message} key={message.id} />
  ));
  return (
    <section className={s.dialogs}>
      <div className={s.dialogsWrapper}>
        <h3 className={s.title}>Dialogs</h3>
        {dialogElements}
      </div>
      <div className={s.messagesWrapper}>
        <h3 className={s.title}>Name</h3>
        {messageElements}
      </div>
    </section>
  );
};

export default Dialogs;
