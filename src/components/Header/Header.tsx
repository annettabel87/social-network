import React, { FC } from 'react';
import s from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}></div>
    </header>
  );
};

export default Header;
