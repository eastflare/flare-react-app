const FormElement = ({id, name, type, option, register, errors}) => {
  const errorMessageStyle = {
    color: 'red',
  }

  return (
    <div>
      <label htmlFor={id}> {name} </label>
      <input id={id} type={type} {...register(id, option)} />
      <div style={errorMessageStyle}> {errors[id] && <p>{ errors[id].message }</p>} </div>
    </div>
  )
}

export default FormElement;
