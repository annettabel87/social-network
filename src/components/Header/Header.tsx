import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IAuthContainerProps } from '../../interfaces';
import s from './Header.module.scss';

const Header: FC<IAuthContainerProps> = (props) => {
  return (
    <header className={s.header}>
      <div className={s.logo}></div>
      <div className={s.loginBlock}>
        {props.isFetching ? (
          <div>...</div>
        ) : props.isAuth ? (
          props.login
        ) : (
          <NavLink className={s.loginLink} to={'/login'}>
            {' '}
            Login{' '}
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
