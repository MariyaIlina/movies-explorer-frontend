import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Register.css";

export default function Register(props) {
  const { onRegister, isLoggedIn } = props;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData.name, userData.email, userData.password);
  };

  if (isLoggedIn) {
    return navigate("/");
  }
  return (
    <div className="register">
      <Header />
      <form onSubmit={handleSubmit} className="register__form">
        <p className="register__entry">Добро пожаловать!</p>
        <label className="register__label">
          {"Имя"}
          <input
            className="register__input"
            name={"name"}
            value={userData.name}
            type={"name"}
            onChange={handleChange}
          />
          <p className="register__input-error">
            <span id={"register-name-error"}></span>
          </p>
        </label>
        <label className="register__label">
          {"E-mail"}
          <input
            className="register__input"
            name={"email"}
            value={userData.email}
            type={"email"}
            onChange={handleChange}
          />
          <p className="register__input-error">
            <span id={"register-email-error"}></span>
          </p>
        </label>
        <label className="register__label">
          {"Пароль"}
          <input
            className="register__input"
            name={"password"}
            value={userData.password}
            type={"password"}
            onChange={handleChange}
          />
          <p className="register__input-error">
            <span id={"register-password-error"}></span>
          </p>
        </label>
        <button
          className="register__button"
          type="submit"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p className="register__text">Уже зарегистрированы? </p>
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </div>
    </div>
  );
}
