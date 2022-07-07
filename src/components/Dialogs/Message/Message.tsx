import React, { FC } from 'react';
import { IMessageProps } from '../../../interfaces';
import s from './Message.module.scss';

const Message: FC<IMessageProps> = (props) => {
  return <div className={s.message}>{props.text}</div>;
};

export default Message;
