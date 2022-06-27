import React, { FC } from 'react';
import avatar from '../../assets/ava.jpg';
import messages from '../../assets/messages.svg';
import news from '../../assets/news.svg';
import music from '../../assets/music.svg';
import settings from '../../assets/settings.svg';
import friends from '../../assets/friends.png';
import s from './Navbar.module.scss';

const Navbar: FC = () => {
  return (
    <nav className={s.navbarContainer}>
      <ul className={s.navbar}>
        <li className={s.item}>
          <a href="#" className={s.link}>
            <img src={avatar} alt="avatar" className={`${s.icon} ${s.profile}`} />
            <p>Profile</p>
          </a>
        </li>
        <li className={s.item}>
          <a href="#" className={s.link}>
            <img src={messages} alt="messages" className={s.icon} />
            <p>Messages</p>
          </a>
        </li>
        <li className={s.item}>
          <a href="#" className={`${s.link} ${s.news}`}>
            <img src={news} alt="news" className={s.icon} />
            <p>News</p>
          </a>
        </li>
        <li className={s.item}>
          <a href="#" className={`${s.link} ${s.music}`}>
            <img src={music} alt="music" className={s.icon} />
            <p>Music</p>
          </a>
        </li>
        <li className={s.item}>
          <a href="#" className={`${s.link} ${s.settings}`}>
            <img src={settings} alt="settings" className={s.icon} />
            <p>Settings</p>
          </a>
        </li>
        <li className={s.item}>
          <a href="#" className={`${s.link} ${s.friends}`}>
            <img src={friends} alt="friends" className={s.icon} />
            <p>Friends</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
