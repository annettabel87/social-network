import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IDialog } from '../../../interfaces';
import s from './Dialog.module.scss';

const Dialog: FC<IDialog> = (props) => {
  return (
    <div className={s.dialog}>
      <NavLink
        to={`/dialogs/${props.id}`}
        className={({ isActive }) => (isActive ? s.active : s.dialogLink)}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default Dialog;
