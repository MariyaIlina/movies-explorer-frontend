import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Auth from "../../utils/auth";
import HeaderSign from "../HeaderSign/HeaderSign";

export default function Register({ isLoggedIn, register }) {
  const navigate = useNavigate();
  const auth = new Auth();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.password) {
      return console.log("!!!!!!");
    }
    register({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    console.log(userData);
  };

  if (isLoggedIn) {
    return navigate("/movies");
  }
  return (
    <div className="register">
      <HeaderSign />
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
