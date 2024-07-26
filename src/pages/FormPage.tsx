import Form from 'components/Form';
import { FormElement } from 'models/form'
import { useState } from 'react';

const FormPage = () => {
  const [formMode, setFormMode] = useState('modify');

  const elements: FormElement[] = [
    {
      id: 'firstName',
      name: 'First Name',
      option: {
        required: 'First Name is required',
      }
    },
    {
      id: 'lastName',
      name: 'Last Name',
      option: {
        required: 'Last Name is required',
      }
    },
    {
      id: 'emailAddress',
      name: 'E-mail',
      type: 'email',
      option: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: 'Invalid email address',
        },
      }
    },
    {
      id: 'password',
      name: 'Password',
      type: 'password',
      option: {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      }
    },
  ]

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <h2>동적 폼 테스트 페이지</h2>
      <Form elements={elements} onSubmit={onSubmit} />
    </>
  );
};

export default FormPage;