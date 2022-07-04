import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { IState } from './redux/state';
import store from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const rerenderTree = (state: IState) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          state={state}
          addPost={store.addPost.bind(store)}
          updateNewPostText={store.updateNewPostText.bind(store)}
        />
      </BrowserRouter>
    </React.StrictMode>
  );
};

rerenderTree(store.getState());
store.subscribe(() => rerenderTree(store.getState()));

reportWebVitals();
