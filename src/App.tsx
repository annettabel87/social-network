import React, { FC } from 'react';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import s from './App.module.scss';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends';
import { IState } from './redux/state';

interface IAppPops {
  updateNewPostText: (newText: string) => void;
  addPost: () => void;
  state: IState;
}
const App: FC<IAppPops> = (props) => {
  return (
    <div className={s.App}>
      <Header />
      <Navbar />
      <main className={s.main}>
        <Routes>
          <Route
            path="profile"
            element={
              <Profile
                state={props.state.profilePage}
                addPost={props.addPost}
                updateNewPosText={props.updateNewPostText}
              />
            }
          />
          <Route path="dialogs/*" element={<Dialogs state={props.state.dialogPage} />} />
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
