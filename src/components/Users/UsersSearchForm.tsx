import { Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { IFilterData } from '../../interfaces';
import s from './Users.module.scss';

interface IInitialValues {
  term: string;
  friend: 'null' | 'true' | 'false';
}
export interface IUserSearchFormProps {
  onSetFilter: (filter: IFilterData) => void;
}
const UsersSearchForm: FC<IUserSearchFormProps> = ({ onSetFilter }) => {
  const initialValues: IInitialValues = {
    term: '',
    friend: 'null',
  };

  return (
    <div className={s.UsersSearchForm}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          const { term, friend } = values;
          const filterData = {
            term,
            friend: friend === 'null' ? null : friend === 'true' ? true : false,
          };

          onSetFilter(filterData);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors, resetForm }) => (
          <Form className={s.form}>
            <Field type="text" name="term" id="term" className={s.input} />
            {touched.term && errors.term && <div className={s.errors}>{errors.term}</div>}

            <Field component="select" name="friend" id="friend" className={s.input}>
              <option value="null">All</option>
              <option value="true">Only friends</option>
              <option value="false">Unfollowed</option>
            </Field>
            {touched.friend && errors.friend && <div className={s.errors}>{errors.friend}</div>}

            <button type="submit" disabled={isSubmitting} className={s.button}>
              Find
            </button>
            <button disabled={isSubmitting} className={s.button} onClick={() => resetForm()}>
              reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UsersSearchForm;
