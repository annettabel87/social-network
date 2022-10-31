import React, { useRef } from 'react';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyObject } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IActionType, IChatState } from '../../interfaces';
import {
  ChatMessageType,
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chatReducer';
import { RootState } from '../../redux/reduxStore';
import s from './Chat.module.css';

const ChatPage: FC = () => {
  return (
    <div className={s.chatPage}>
      <Chat />
    </div>
  );
};

const Chat: FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, IActionType>>();
  const status = useSelector(
    (state: EmptyObject & { chatReducer: IChatState }) => state.chatReducer.statusWs
  );
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: FC = () => {
  const messages = useSelector(
    (state: EmptyObject & { chatReducer: IChatState }) => state.chatReducer.messages
  );
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={s.messagesBlock} onScroll={scrollHandler}>
      {messages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};
const Message: FC<ChatMessageType> = React.memo(
  ({ id, message, photo, userName }: ChatMessageType) => {
    console.log(id);
    return (
      <div className={s.messageWrapper}>
        <img className={s.avatar} src={photo} alt="avatar" />
        <div className={s.textWrapper}>
          <div className={s.title}>{userName}</div>
          <div className={s.text}>{message}</div>
        </div>
      </div>
    );
  }
);
const AddMessageForm: FC = () => {
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, IActionType>>();
  const status = useSelector((state: { chatReducer: IChatState }) => state.chatReducer.statusWs);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };
  return (
    <div className={s.AddMessageForm}>
      <div className={s.form}>
        <textarea
          className={s.input}
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
          value={message}
        ></textarea>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler} className={s.button}>
          Send
        </button>
      </div>
    </div>
  );
};
export default ChatPage;
