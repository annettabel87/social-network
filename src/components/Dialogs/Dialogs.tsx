import React, { FC } from 'react';
import { IDialogsProps } from '../../interfaces';
import { Field, Form, Formik, FormikValues } from 'formik';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import s from './Dialogs.module.scss';

const Dialogs: FC<IDialogsProps> = (props) => {
  const dialogElements = props.state.dialogs.map((dialog) => (
    <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />
  ));
  const messageElements = props.state.messages.map((message) => (
    <Message text={message.message} key={message.id} />
  ));

  return (
    <section className={s.dialogs}>
      <div className={s.dialogsWrapper}>
        <h3 className={s.title}>Dialogs</h3>
        {dialogElements}
      </div>
      <div className={s.messagesWrapper}>
        <h3 className={s.title}>Name</h3>
        <div className={s.messageBlock}>{messageElements}</div>
        <AddMessageForm sendMessage={props.sendMessage} />
      </div>
    </section>
  );
};
export interface IInitialValues {
  messageText: string;
}
export interface IErrors {
  messageText?: string;
}
export interface IAddMessageFormProps {
  sendMessage: (messageText: string) => void;
}
const AddMessageForm: FC<IAddMessageFormProps> = ({ sendMessage }) => {
  const initialValues: IInitialValues = {
    messageText: '',
  };
  const validate = (values: FormikValues) => {
    const errors: IErrors = {};

    if (values.messageText.length > 300) {
      errors.messageText = 'Max length 300';
    }
    return errors;
  };
  return (
    <div className={s.newMessage}>
      <Formik
        initialValues={initialValues}
        validate={(values: FormikValues) => validate(values)}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { messageText } = values;
          sendMessage(messageText);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={s.form}>
            <Field
              type="textarea"
              name="messageText"
              id="messageText"
              placeholder="input your message"
              className={s.newMessageInput}
            />
            {touched.messageText && errors.messageText && (
              <div className={s.errors}>{errors.messageText}</div>
            )}

            <button type="submit" disabled={isSubmitting} className={s.btn}>
              send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Dialogs;
