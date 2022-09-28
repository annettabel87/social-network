import React, { lazy, Suspense } from 'react';
import { EmptyObject } from 'redux';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { initializedSuccess } from './redux/appReducer';
import Preloader from './common/Preloader/Preloader';
import { IAppComponentProps, IAppState } from './interfaces';
import Navbar from './components/Navbar/Navbar';
const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

import s from './App.module.scss';

const mapState = (
  state: EmptyObject & {
    appReducer: IAppState;
  }
) => {
  return {
    initialized: state.appReducer.initialized,
  };
};
class App extends React.Component<IAppComponentProps> {
  componentDidMount() {
    this.props.initializedSuccess();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className={s.App}>
        <HeaderContainer />
        <Navbar />
        <main className={s.main}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="profile/" element={<ProfileContainer />} />
              <Route path="profile/:useId" element={<ProfileContainer />} />
              <Route path="dialogs/*" element={<DialogsContainer />} />
              <Route path="news" element={<News />} />
              <Route path="music" element={<Music />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<UsersContainer />} />
              <Route path="login" element={<Login />} />
              <Route path="/" element={<Navigate to="/profile" />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    );
  }
}
const AppContainer = connect(mapState, { initializedSuccess })(App);
export default AppContainer;
