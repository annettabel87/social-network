import React, { ChangeEvent, FC, useState } from 'react';
import Preloader from '../../../common/Preloader/Preloader';
import { IProfileProps } from '../../../interfaces';
import userPhoto from '../../../assets/user.png';
import s from './ProfileInfo.module.scss';
import ProfileStatus from './ProfileStatus';
import ProfileData from './ProfileData';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo: FC<IProfileProps> = React.memo((props) => {
  const [showImg, setShowImg] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const showButton = () => {
    setShowImg(true);
  };
  const hiddenButton = () => {
    setShowImg(false);
  };
  const sendSavePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  if (!props.profile) {
    return <Preloader />;
  } else {
    return (
      <div className={s.info}>
        <div className={s.ava} onMouseOver={showButton} onMouseOut={hiddenButton}>
          <img
            alt="avatar"
            src={props.profile.photos.small ? props.profile.photos.small : userPhoto}
            className={s.avatarImg}
          />
          {showImg && props.isAuth && (
            <div className={s.avaBtnWrapper}>
              <label className={s.avaBtnLabel}>
                Select Photo
                <input
                  type={'file'}
                  className={s.avaBtn}
                  onChange={(e) => {
                    sendSavePhoto(e);
                  }}
                />
              </label>
            </div>
          )}
        </div>
        <div className={s.description}>
          <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
          {editMode ? (
            <ProfileDataForm
              profile={props.profile}
              setEditMode={() => setEditMode(false)}
              saveProfile={props.saveProfile}
            />
          ) : (
            <ProfileData
              profile={props.profile}
              isAuth={props.isAuth}
              setEditMode={() => setEditMode(true)}
            />
          )}
        </div>
      </div>
    );
  }
});

export default ProfileInfo;
