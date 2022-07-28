import React, { FC } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import s from './App.module.scss';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App: FC = () => {
  return (
    <div className={s.App}>
      <HeaderContainer />
      <Navbar />
      <main className={s.main}>
        <Routes>
          <Route path="profile/" element={<ProfileContainer />} />
          <Route path="profile/:useId" element={<ProfileContainer />} />
          <Route path="dialogs/*" element={<DialogsContainer />} />
          <Route path="news" element={<News />} />
          <Route path="music" element={<Music />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<UsersContainer />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
