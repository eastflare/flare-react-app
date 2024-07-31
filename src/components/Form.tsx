import { useForm } from 'react-hook-form';
import FormElement from 'components/FormElement';

const Form = ({elements, onSubmit}) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        elements.map(element => <FormElement
                                  key={element.id}
                                  id={element.id}
                                  name={element.name} 
                                  option={element.option} 
                                  register={register} 
                                  errors={errors}
                                />)
      }
      <button type="submit">등록</button>
    </form>
  );
};

export default Form;