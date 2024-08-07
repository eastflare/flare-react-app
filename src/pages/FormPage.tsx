import Form from 'components/Form';
import { IFormElement } from 'models/form'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

const FormPage = () => {

  const elements: IFormElement[] = [
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

  const onSubmit = (data: FieldValues) => {
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