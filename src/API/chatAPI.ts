import {
  EventsNamesType,
  MessagesReceivedSubscriberType,
  StatusChangedSubscriberType,
  StatusType,
} from '../interfaces';

let ws: WebSocket | null = null;

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};

const notifySubscribersAboutStatus = (statusWs: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(statusWs));
};
const closeHandler = () => {
  notifySubscribersAboutStatus('pending');
  setTimeout(createChanel, 3000);
};
const openHandler = () => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
  notifySubscribersAboutStatus('error');
  console.error('REFRESH PAGE');
};
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};

function createChanel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifySubscribersAboutStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  ws.addEventListener('open', openHandler);
  ws.addEventListener('error', errorHandler);
}
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach((s) => s(newMessages));
};

export const chatAPI = {
  start() {
    createChanel();
  },
  stop() {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
    ws?.close();
  },

  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },

  sendMessage(message: string) {
    ws?.send(message);
  },
};
