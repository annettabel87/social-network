import React, { FC } from 'react';
import s from './Message.module.scss';

interface IMessageProps {
  text: string;
}

const Message: FC<IMessageProps> = (props) => {
  return <div className={s.message}>{props.text}</div>;
};

export default Message;
