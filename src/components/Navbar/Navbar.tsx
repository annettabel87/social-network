import React, { FC } from 'react';
import avatar from '../../assets/ava.jpg';
import messages from '../../assets/messages.svg';
import news from '../../assets/news.svg';
import music from '../../assets/music.svg';
import settings from '../../assets/settings.svg';
import friends from '../../assets/friends.png';
import chat from '../../assets/chat.png';
import s from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <nav className={s.navbarContainer}>
      <ul className={s.navbar}>
        <li className={s.item}>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? s.active : s.link)}>
            <img src={avatar} alt="avatar" className={`${s.icon} ${s.profile}`} />
            <p>Profile</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/dialogs" className={s.link}>
            <img src={messages} alt="messages" className={s.icon} />
            <p>Messages</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/news" className={`${s.link} ${s.news}`}>
            <img src={news} alt="news" className={s.icon} />
            <p>News</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/music" className={`${s.link} ${s.music}`}>
            <img src={music} alt="music" className={s.icon} />
            <p>Music</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/settings" className={`${s.link} ${s.settings}`}>
            <img src={settings} alt="settings" className={s.icon} />
            <p>Settings</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/users" className={`${s.link} ${s.users}`}>
            <img src={friends} alt="users" className={s.icon} />
            <p>Users</p>
          </NavLink>
          <NavLink to="/chat" className={`${s.link} ${s.chat}`}>
            <img src={chat} alt="chat" className={s.icon} />
            <p>Chat</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
