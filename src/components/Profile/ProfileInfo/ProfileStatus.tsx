import React, { FC, useState } from 'react';
import { IProfileStatusProps } from '../../../interfaces';
import s from './ProfileStatus.module.scss';

const ProfileStatus: FC<IProfileStatusProps> = ({ status, updateStatus }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [localStatus, setLocalStatus] = useState<string>(status);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deActivateEditMode = () => {
    setEditMode(false);
    updateStatus(localStatus);
  };
  return (
    <div className={s.profileStatusWrapper}>
      {!editMode && (
        <div className={s.profileStatusText} onDoubleClick={activateEditMode}>
          status: {status || '----'}
        </div>
      )}
      {editMode && (
        <div className={s.profileStatusInputWrapper}>
          <input
            className={s.profileStatusInput}
            autoFocus={true}
            value={localStatus}
            onBlur={deActivateEditMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocalStatus(e.currentTarget.value)
            }
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
