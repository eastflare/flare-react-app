const FormElement = ({id, name, type, option, register, errors}) => {
  const thStyle = {
    width: '150px',
  };

  const errorMessageStyle = {
    color: 'red',
  };

  return (
    <div>
      <tr>
        <th style={thStyle}>
          <label htmlFor={id}>{name}</label>
        </th>
        <td>
          <input id={id} type={type} {...register(id, option)} />
        </td>
        {
          errors[id] && <div style={errorMessageStyle}>{errors[id].message}</div>
        }
      </tr>
    </div>
  )
}

export default FormElement;
