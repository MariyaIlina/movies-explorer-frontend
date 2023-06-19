import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Login.css";
import Input from "../Input/Input";

export default function Login({ onLogin, isLoggedIn }) {
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
    onLogin(userData.email, userData.password);
  };

  if (isLoggedIn) {
    return navigate("/");
  }
  return (
    <div className="login">
      <Header />

      <form className="login__form" onSubmit={handleSubmit}>
        <p className="login__entry">Рады видеть!</p>
        <Input
          label="E-mail"
          name="email"
          value={userData.email}
          type="email"
          onChange={handleChange}
          error="login-email-error"
        />
        <Input
          label="Пароль"
          name="password"
          value={userData.password}
          type="password"
          onChange={handleChange}
          error="login-password-error"
        />
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
