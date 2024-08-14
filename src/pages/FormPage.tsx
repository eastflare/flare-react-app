import Form from 'components/Form';
import { FieldValues } from 'react-hook-form';
import { retrieveFormData } from "@/mocks/formHandlers";

const FormPage = () => {
  const elements = retrieveFormData();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  }

  return (
    <Form elements={elements} onSubmit={onSubmit} />
  );
};

export default FormPage;