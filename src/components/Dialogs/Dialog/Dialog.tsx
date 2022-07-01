import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.scss';

interface IDialogProps {
  id: string;
  name: string;
}

const Dialog: FC<IDialogProps> = (props) => {
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
