import s from './Login.module.scss';
import { Field, Form, Formik, FormikValues } from 'formik';
import { IAuthState, ILoginProps } from '../../interfaces';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { getCaptchaUrl, logIn } from '../../redux/authReducer';
import { connect } from 'react-redux';
import { EmptyObject } from 'redux';

export interface IInitialValues {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
}
export interface IErrors {
  email?: string;
  password?: string;
  captcha?: string;
}
const mapState = (
  state: EmptyObject & {
    authReducer: IAuthState;
  }
) => {
  return {
    isAuth: state.authReducer.isAuth,
    captchaUrl: state.authReducer.captchaUrl,
  };
};

const Login = (props: ILoginProps) => {
  if (props.isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div>
      <h3 className={s.title}>Login</h3>
      <LoginForm {...props} />
    </div>
  );
};

const LoginForm: FC<ILoginProps> = ({ logIn, captchaUrl }) => {
  const initialValues: IInitialValues = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: null,
  };
  const validate = (values: FormikValues) => {
    const errors: IErrors = {};

    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };
  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialValues}
        validate={(values: FormikValues) => validate(values)}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          const { email, password, rememberMe, captcha } = values;
          logIn(email, password, rememberMe, setStatus, captcha);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors, status }) => (
          <Form className={s.form}>
            <label htmlFor="email">E-mail</label>
            <Field type="email" name="email" id="email" className={s.input} />
            {touched.email && errors.email && <div className={s.errors}>{errors.email}</div>}

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" className={s.input} />
            {touched.password && errors.password && (
              <div className={s.errors}>{errors.password}</div>
            )}
            <div className={s.checkboxWrapper}>
              <label htmlFor="rememberMe">Remember me</label>
              <Field type="checkbox" name="rememberMe" id="rememberMe" />
            </div>
            {captchaUrl && (
              <>
                <label htmlFor="captcha">Input captcha</label>
                <img src={captchaUrl} alt={'captcha'} />
                <Field type="captcha" name="captcha" id="captcha" className={s.input} />
                {touched.captcha && errors.captcha && (
                  <div className={s.errors}>{errors.captcha}</div>
                )}
              </>
            )}

            <div className={s.errors}>{status}</div>
            <button type="submit" disabled={isSubmitting} className={s.button}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const LoginContainer = connect(mapState, { logIn, getCaptchaUrl })(Login);
export default LoginContainer;
