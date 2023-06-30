import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

const Login = ({
  onLogin,
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
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          onLogin();
          setFormValue({ email: '', password: '' });
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="form-container">
      <h1 className="form-container__header">Вход</h1>
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
        <button className="form__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
