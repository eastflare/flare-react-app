import { FormElementProps } from "models/form";

const FormElement = ({ id, name, type, option, register, errors }: FormElementProps) => {
  const thStyle = {
    width: "100px",
  };

  const errorMessageStyle = {
    color: "red",
    marginLeft: "3px",
  };

  return (
    <table>
      <tbody>
        <tr>
          <th style={thStyle}>
            <label htmlFor={id}>{name}</label>
          </th>
          <td>
            <input id={id} type={type} {...register(id, option)} />
            {errors[id] && <a style={errorMessageStyle}>{errors[id].message}</a>}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FormElement;
