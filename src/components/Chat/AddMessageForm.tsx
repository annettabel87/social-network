import { FC } from 'react';
import s from 'Chat.module.css';
import { Field, Form, Formik } from 'formik';

const AddMessageForm: FC = () => {
  const initialValues = {
    message: '',
  };
  return (
    <div className={s.AddMessageForm}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors, resetForm }) => (
          <Form className={s.form}>
            <Field type="textarea" name="message" id="message" className={s.input} />
            {touched.message && errors.message && <div className={s.errors}>{errors.message}</div>}

            <button type="submit" disabled={isSubmitting} className={s.button}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMessageForm;
