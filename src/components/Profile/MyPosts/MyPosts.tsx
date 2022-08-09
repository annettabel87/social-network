import React, { FC } from 'react';
import { Field, Form, Formik, FormikValues } from 'formik';
import avatar from '../../../assets/ava.jpg';
import { IMyPostsprops } from '../../../interfaces';
import Post from './Post/Post';
import s from './MyPosts.module.scss';

const MyPosts: FC<IMyPostsprops> = (props) => {
  const postElements = props.posts.map((post) => (
    <Post message={post.post} key={post.id} likeCount={post.likeCount} />
  ));

  const addPost = (postText: string) => {
    props.addPost(postText);
  };

  return (
    <div className={s.myPosts}>
      <div className={s.createPost}>
        <img src={avatar} alt="avatar" className={s.avatarIcon} />
        <PostForm addPost={addPost} />
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};
export interface IInitialValues {
  postText: string;
}
export interface IErrors {
  postText?: string;
}
export interface IPostProps {
  addPost: (postText: string) => void;
}
const PostForm: FC<IPostProps> = ({ addPost }) => {
  const initialValues: IInitialValues = {
    postText: '',
  };
  const validate = (values: FormikValues) => {
    const errors: IErrors = {};

    if (values.postText.length > 500) {
      errors.postText = 'Max length 500';
    }
    return errors;
  };
  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialValues}
        validate={(values: FormikValues) => validate(values)}
        onSubmit={(values, { setSubmitting }) => {
          const { postText } = values;
          addPost(postText);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={s.form}>
            <Field type="textarea" name="postText" id="postText" className={s.newPost} />
            {touched.postText && errors.postText && (
              <div className={s.errors}>{errors.postText}</div>
            )}

            <button type="submit" disabled={isSubmitting} className={s.btn}>
              +
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default MyPosts;
