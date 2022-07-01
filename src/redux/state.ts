export interface IState {
  profilePage: {
    posts: IPost[];
  };
  dialogPage: {
    dialogs: IDialog[];
    messages: IMessage[];
  };
}
export interface IDialog {
  id: number;
  name: string;
}
export interface IMessage {
  id: number;
  message: string;
}
export interface IPost {
  id: number;
  post: string;
  likeCount: number;
}
const state: IState = {
  profilePage: {
    posts: [
      { id: 1, post: 'Hello', likeCount: 4 },
      { id: 2, post: 'My post 1', likeCount: 2 },
      { id: 3, post: 'My post 2', likeCount: 56 },
      { id: 4, post: 'My post 3', likeCount: 100 },
    ],
  },
  dialogPage: {
    dialogs: [
      { id: 1, name: 'Anna' },
      { id: 2, name: 'Aleksey' },
      { id: 3, name: 'Lev' },
      { id: 4, name: 'Mikhail' },
    ],
    messages: [
      { id: 1, message: 'Hi' },
      { id: 2, message: 'Hello world' },
      { id: 3, message: 'How are you?' },
    ],
  },
};
export default state;
