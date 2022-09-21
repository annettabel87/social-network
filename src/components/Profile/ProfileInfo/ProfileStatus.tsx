import React, { FC, useEffect, useState } from 'react';
import { IProfileStatusProps } from '../../../interfaces';
import s from './ProfileStatus.module.scss';

const ProfileStatus: FC<IProfileStatusProps> = ({ status, updateStatus }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [localStatus, setLocalStatus] = useState<string>(status);
  useEffect(() => {
    setLocalStatus(status);
  }, [status]);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deActivateEditMode = () => {
    setEditMode(false);
    updateStatus(localStatus);
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(e.currentTarget.value);
  };
  return (
    <div className={s.profileStatusWrapper}>
      {!editMode && (
        <div data-testid="status" className={s.profileStatusText} onDoubleClick={activateEditMode}>
          <b>status:</b> {localStatus || '----'}
        </div>
      )}
      {editMode && (
        <div className={s.profileStatusInputWrapper}>
          <input
            data-testid="statusInput"
            className={s.profileStatusInput}
            autoFocus={true}
            value={localStatus}
            onBlur={deActivateEditMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChangeHandler(e);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
