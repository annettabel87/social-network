import React, { FC } from 'react';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import s from './App.module.scss';

const App: FC = () => {
  return (
    <div className={s.App}>
      <Header />
      <Navbar />
      <Profile />
    </div>
  );
};

export default App;
