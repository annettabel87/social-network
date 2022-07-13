import React, { FC } from 'react';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import s from './App.module.scss';

const App: FC = () => {
  return (
    <div className={s.App}>
      <Header />
      <Navbar />
      <main className={s.main}>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="dialogs/*" element={<DialogsContainer />} />
          <Route path="news" element={<News />} />
          <Route path="music" element={<Music />} />
          <Route path="settings" element={<Settings />} />
          <Route path="friends" element={<Friends />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
