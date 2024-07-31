import { FormElementProps } from "models/form";
import { FieldError } from "react-hook-form";

const FormElement = ({ id, name, type, option, register, errors }: FormElementProps) => {
  const thStyle = {
    width: "100px",
  };

  const errorMessageStyle = {
    color: "red",
    marginLeft: "3px",
  };

  const error = errors[id] as FieldError;

  return (
    <table>
      <tbody>
        <tr>
          <th style={thStyle}>
            <label htmlFor={id}>{name}</label>
          </th>
          <td>
            <input id={id} type={type} {...register(id, option)} />
            {error?.message && <a style={errorMessageStyle}>{error.message}</a>}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FormElement;
