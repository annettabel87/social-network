export interface IState {
  profilePage: {
    posts: IPost[];
    newPostText: string;
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

const store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, post: 'Hello', likeCount: 4 },
        { id: 2, post: 'My post 1', likeCount: 2 },
        { id: 3, post: 'My post 2', likeCount: 56 },
        { id: 4, post: 'My post 3', likeCount: 100 },
      ],
      newPostText: '',
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
  },
  getState() {
    return this._state;
  },
  _callSubscriber(state: IState | null) {
    console.log(state);
  },
  addPost() {
    const newPost: IPost = {
      id: 5,
      post: this._state.profilePage.newPostText,
      likeCount: 0,
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(this._state);
  },
  updateNewPostText(newText: string) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },
  subscribe(observer: () => void) {
    this._callSubscriber = observer;
  },
};

export default store;
