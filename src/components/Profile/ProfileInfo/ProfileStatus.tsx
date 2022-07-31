import React, { FC, useState } from 'react';
import s from './ProfileStatus.module.scss';
export interface IProfileStatusProps {
  status: string;
}
const ProfileStatus: FC<IProfileStatusProps> = ({ status }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deActivateEditMode = () => {
    setEditMode(false);
  };
  return (
    <div className={s.profileStatusWrapper}>
      {!editMode && (
        <div className={s.profileStatusText} onDoubleClick={activateEditMode}>
          {status}
        </div>
      )}
      {editMode && (
        <div className={s.profileStatusInputWrapper}>
          <input
            className={s.profileStatusInput}
            autoFocus={true}
            value={status}
            onBlur={deActivateEditMode}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
