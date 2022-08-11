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
          <>
            <div className={s.text}>{props.login}</div>
            <button onClick={props.logOut} className={s.btn}>
              logOut
            </button>
          </>
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
