import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import * as auth from '../utils/auth';

const Register = ({
  onRegister,
}) => {

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.email, formValue.password)
      .then(() => {
        onRegister(true);
        setFormValue({ email: '', password: '' });
        navigate('/signin', { replace: true });
      })
      .catch(() => onRegister(false));
  }

  return (
    <div className="form-container">
      <h1 className="form-container__header">Регистрация</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          name="email"
          type="email"
          required
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email || ''}
        ></input>
        <input
          className="form__input"
          name="password"
          type="password"
          required
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password || ''}
        ></input>
        <button className="form__button">Зарегистрироваться</button>
      </form>
      <p className="form-container__question">
        Уже зарегистрированы?&nbsp;<Link to="/signin" className="form-container__link" >
          Войти
        </Link>
      </p>
    </div>
  )
}

export default Register;
