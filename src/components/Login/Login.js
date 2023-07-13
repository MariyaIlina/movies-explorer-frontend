import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderSign from "../HeaderSign/HeaderSign";
import "./Login.css";
import { useFormWithValidation } from "../Validate/Validate";

export default function Login({ login, isLoggedIn }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!isValid) {
        return;
      }
      login({
        email: values.email,
        password: values.password,
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
            value={values.email || ""}
            type={"email"}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          {/* <p className="login__error">
            <span id={"login-email-error"}></span>
          </p> */}
        </label>
        <label className="login__label">
          {"Пароль"}
          <input
            className="login__input"
            name={"password"}
            value={values.password || ""}
            type={"password"}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="login__error">{errors.password}</span>
          )}

          {/* <p className="login__error">
            <span id={"login-password-error"}></span>
          </p> */}
        </label>
        <p className="error-message">{errors.login || errors.password}</p>
        <button
          type="submit"
          disabled={!isValid}
          className={isValid ? "login__button" : "login__button-disabled"}
          onSubmit={handleSubmit}
        >
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
