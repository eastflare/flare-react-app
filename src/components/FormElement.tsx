import styled from "@emotion/styled";
import { FormElementProps } from "models/form";
import { FieldError } from "react-hook-form";

const StyledTh = styled.th`
  width: 100px;
  text-align: left;
`;

const StyledErrorPanel = styled.a`
  color: red;
  margin-left: 3px;
`;

const FormElement = ({ id, name, type, option, register, errors }: FormElementProps) => {
  const error = errors[id] as FieldError;

  return (
    <>
      <StyledTh>
        <label htmlFor={id}>{name}</label>
      </StyledTh>
      <td>
        <input id={id} type={type} {...register(id, option)} />
        {error?.message && <StyledErrorPanel>{error.message}</StyledErrorPanel>}
      </td>
    </>
  );
};

export default FormElement;
