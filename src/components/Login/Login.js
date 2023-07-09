import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderSign from "../HeaderSign/HeaderSign";
import "./Login.css";

export default function Login({ login, isLoggedIn }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    login({
      email: userData.email,
      password: userData.password,
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/movies");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login">
      <HeaderSign />
      <form className="login__form" onSubmit={handleSubmit}>
        <p className="login__entry">Рады видеть!</p>
        <label className="login__label">
          {"E-mail"}
          <input
            className="login__input"
            name={"email"}
            value={userData.email}
            type={"email"}
            onChange={handleChange}
          />
          <p className="login__error">
            <span id={"login-email-error"}></span>
          </p>
        </label>
        <label className="login__label">
          {"Пароль"}
          <input
            className="login__input"
            name={"password"}
            value={userData.password}
            type={"password"}
            onChange={handleChange}
          />
          <p className="login__error">
            <span id={"login-password-error"}></span>
          </p>
        </label>
        <button type="submit" onSubmit={handleSubmit} className="login__button">
          Войти
        </button>
      </form>
      <div className="login__signin">
        <p className="login__text">Ещё не зарегистрированы? </p>
        <Link to="/signup" className="login__link">
          Регистрация
        </Link>
      </div>
    </div>
  );
}
