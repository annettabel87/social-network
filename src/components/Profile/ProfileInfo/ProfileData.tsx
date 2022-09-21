import { FC } from 'react';
import { IContactsProps, IProfileDataProps } from '../../../interfaces';
import aboutMe from '../../../assets/aboutMe.png';
import job from '../../../assets/job.png';
import skills from '../../../assets/skills.png';
import facebook from '../../../assets/fb.svg';
import website from '../../../assets/www.png';
import vk from '../../../assets/vk.svg';
import twitter from '../../../assets/tw.svg';
import instagram from '../../../assets/instagram.svg';
import youtube from '../../../assets/youtube.svg';
import github from '../../../assets/github.svg';
import mainLink from '../../../assets/mainLink.png';
import s from './ProfileInfo.module.scss';

const ProfileData: FC<IProfileDataProps> = (props: IProfileDataProps) => {
  return (
    <div className={s.profileDataBlock}>
      <div className={s.ProfileDescription}>
        <div className={s.description}>
          <b>{props.profile.fullName}</b>
        </div>
        <div className={s.description}>
          <img src={aboutMe} alt="about me" className={s.contactsImg} /> {props.profile.aboutMe}
        </div>
        <div className={s.description}>
          <img src={job} alt="job" className={s.contactsImg} />
          <b>looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {!!props.profile.lookingForAJobDescription && (
          <div className={s.description}>
            <img src={skills} alt="skills" className={s.contactsImg} />
            <b>My skills:</b> {props.profile.lookingForAJobDescription}
          </div>
        )}
        <div className={s.description}>
          <b>Contacts:</b>{' '}
          {Object.entries(props.profile.contacts).map(([key, value]) => {
            if (value) {
              return <Contact key={key} contactName={key} contactValue={value} />;
            }
          })}
        </div>
      </div>
      {props.isAuth && (
        <button className={s.button} onClick={props.setEditMode}>
          Edit
        </button>
      )}
    </div>
  );
};

const icons = { facebook, website, vk, twitter, instagram, youtube, github, mainLink };
const Contact: FC<IContactsProps> = (props: IContactsProps) => {
  return (
    <div className={s.contactsForm}>
      <img
        src={icons[props.contactName as keyof typeof icons]}
        alt={props.contactName}
        className={s.contactsImg}
      />
      {props.contactValue}
    </div>
  );
};
export default ProfileData;
