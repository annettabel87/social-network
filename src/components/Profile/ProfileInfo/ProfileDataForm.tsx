import { FC } from 'react';
import { IIniialValueProfile, IProfileDataFormProps } from '../../../interfaces';
import facebook from '../../../assets/fb.svg';
import website from '../../../assets/www.png';
import vk from '../../../assets/vk.svg';
import twitter from '../../../assets/tw.svg';
import instagram from '../../../assets/instagram.svg';
import youtube from '../../../assets/youtube.svg';
import github from '../../../assets/github.svg';
import mainLink from '../../../assets/mainLink.png';
import s from './ProfileInfo.module.scss';
import { Field, Form, Formik, FormikValues } from 'formik';

export interface IErrors {
  lookingForAJob?: string;
  lookingForAJobDescription?: string;
  fullName?: string;
  aboutMe?: string;
}
const ProfileDataForm: FC<IProfileDataFormProps> = (props: IProfileDataFormProps) => {
  const initialValues: IIniialValueProfile = {
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    aboutMe: '',
    contacts: {
      github: '',
      vk: '',
      facebook: '',
      instagram: '',
      twitter: '',
      website: '',
      youtube: '',
      mainLink: '',
    },
  };
  const validate = (values: FormikValues) => {
    const errors: IErrors = {};

    if (!values.lookingForAJob) {
      errors.lookingForAJob = 'Required';
    }
    if (!values.lookingForAJobDescription) {
      errors.lookingForAJobDescription = 'Required';
    }
    if (!values.fullName) {
      errors.fullName = 'Required';
    }
    if (!values.aboutMe) {
      errors.aboutMe = 'Required';
    }

    return errors;
  };
  return (
    <div className={s.profileDataFormBlock}>
      <Formik
        initialValues={initialValues}
        validate={(values: FormikValues) => validate(values)}
        onSubmit={(values, { setSubmitting }) => {
          props.saveProfile(values);
          props.setEditMode();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={s.form}>
            <label htmlFor="fullName">Full name</label>
            <Field type="text" name="fullName" id="fullName" className={s.input} />
            {touched.fullName && errors.fullName && (
              <div className={s.errors}>{errors.fullName}</div>
            )}
            <label htmlFor="aboutMe">About me</label>
            <Field type="textarea" name="aboutMe" id="aboutMe" className={s.input} />
            {touched.aboutMe && errors.aboutMe && <div className={s.errors}>{errors.aboutMe}</div>}
            <div className={s.checkboxWrapper}>
              <label htmlFor="lookingForAJob">looking for a job</label>
              <Field type="checkbox" name="lookingForAJob" id="lookingForAJob" />
            </div>
            <label htmlFor="lookingForAJobDescription">My skills</label>
            <Field
              type="text"
              name="lookingForAJobDescription"
              id="lookingForAJobDescription"
              className={s.input}
            />
            {touched.lookingForAJobDescription && errors.lookingForAJobDescription && (
              <div className={s.errors}>{errors.lookingForAJobDescription}</div>
            )}
            <b>Contacts:</b>{' '}
            {Object.entries(props.profile.contacts).map(([key, value]) => {
              return (
                <div className={s.contactsForm} key={key}>
                  <img
                    src={icons[key as keyof typeof icons]}
                    alt={value}
                    className={s.contactsImg}
                  />
                  <Field type="text" name={'contacts.' + key} id={key} className={s.input} />
                </div>
              );
            })}
            <button type="submit" disabled={isSubmitting} className={s.button}>
              save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const icons = { facebook, website, vk, twitter, instagram, youtube, github, mainLink };

export default ProfileDataForm;
