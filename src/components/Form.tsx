import { useForm } from "react-hook-form";
import FormRow from "components/FormRow";
import FormElement from "components/FormElement";
import FormTable from "components/FormTable";
import { FormProps } from "models/form";
import { GreyButton } from "./buttons/CustomButton";
import _ from "lodash";

const Form = ({ elements, onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <FormTable>
        {
          elements.map(pair => (
            <FormRow>
            {
              pair.map(element=> (
                <FormElement id={element.id} name={element.name} option={element.option} register={register} errors={errors} />
              ))
            }
            </FormRow>
          ))
        }
      </FormTable>
      <GreyButton onClick={handleSubmit(onSubmit)}>등록</GreyButton>
    </>
  );
};

export default Form;
