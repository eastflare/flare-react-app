const FormElement = ({id, name, type, option, register, errors}) => {
  const formElementStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const errorMessageStyle = {
    color: 'red',
  };

  return (
    <div style={formElementStyle}>
      <label htmlFor={id}>{name}</label>
      <input id={id} type={type} {...register(id, option)} />
      {
        errors[id] && <div style={errorMessageStyle}>{errors[id].message}</div>
      }
    </div>
  )
}

export default FormElement;
