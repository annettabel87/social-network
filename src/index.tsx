import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import { IReduxState } from './interfaces';
import { EmptyObject } from 'redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const rerenderTree = (state: EmptyObject & IReduxState) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state} dispatch={store.dispatch.bind(store)} />
      </BrowserRouter>
    </React.StrictMode>
  );
};

rerenderTree(store.getState());
store.subscribe(() => {
  const state = store.getState();
  rerenderTree(state);
});

reportWebVitals();
