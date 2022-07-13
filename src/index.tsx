import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import './index.scss';
import StoreContext from './storeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const rerenderTree = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <StoreContext.Provider value={store}>
          <App />
        </StoreContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

rerenderTree();
store.subscribe(() => {
  rerenderTree();
});

reportWebVitals();
