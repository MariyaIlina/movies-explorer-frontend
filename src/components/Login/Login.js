import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderSign from "../HeaderSign/HeaderSign";
import "./Login.css";
import { useFormWithValidation } from "../Validate/Validate";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Login({ login, isLoggedIn }) {
  const { isError } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

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
        <div className="login__block">
          <label className="login__label">
            E-mail
            <input
              className={`login__input ${errors.email && "login__input-error"}`}
              name="email"
              value={values.email}
              type="email"
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="login__error">{errors.email}</span>
            )}
          </label>
          <label className="login__label">
            Пароль
            <input
              className={`login__input ${
                errors.password && "login__input-error"
              }`}
              name="password"
              value={values.password || ""}
              type="password"
              onChange={handleChange}
              required
              minLength="8"
            />
            {errors.password && (
              <span className="login__error">{errors.password}</span>
            )}
          </label>
        </div>
        {isError.login && (
          <p className="login__error-message">
            {isError.login === 401
              ? "Вы ввели неправильный логин или пароль."
              : "При авторизации произошла ошибка."}
          </p>
        )}
        <button
          type="submit"
          disabled={!isValid}
          className="login__button"
          onSubmit={handleSubmit}
        >
          Войти
        </button>
        <div className="login__signin">
          <p className="login__text">Ещё не зарегистрированы? </p>
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
}
