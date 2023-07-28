import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import HeaderSign from "../HeaderSign/HeaderSign";
import { useFormWithValidation } from "../Validate/Validate";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Register({ isLoggedIn, register }) {
  const { isError } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!isValid || isError.register) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isValid, isError.register]);

  const navigate = useNavigate();

  const handleChangeName = (e) => {
    const regExpName = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    const value = e.target.value;
    if (value < 1) {
      handleChange(e);
    } else if (regExpName.test(value)) {
      handleChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.password) {
      return console.log("!!!!!!");
    }
    register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  if (isLoggedIn) {
    navigate("/movies");
  }

  return (
    <div className="register">
      <HeaderSign />
      <form onSubmit={handleSubmit} className="register__form">
        <p className="register__entry">Добро пожаловать!</p>
        <label className="register__label">
          Имя
          <input
            className={`register__input ${
              errors.name && "register__input-error"
            }`}
            name="name"
            value={values.name}
            type="name"
            onChange={handleChangeName}
            required
            minLength="2"
            maxLength="40"
          />
          {errors.name && (
            <span className="register__error">{errors.name}</span>
          )}
        </label>
        <label className="register__label">
          E-mail
          <input
            className={`register__input ${
              errors.email && "register__input-error"
            }`}
            name="email"
            value={values.email}
            type="email"
            onChange={handleChange}
            required
          />
          {errors.email && (
            <span className="register__error">{errors.email}</span>
          )}
        </label>
        <label className="register__label">
          Пароль
          <input
            className={`register__input ${
              errors.password && "register__input-error"
            }`}
            name="password"
            value={values.password || ""}
            type="password"
            onChange={handleChange}
            required
            minLength="8"
      
          />
          {errors.password && (
            <span className="register__error">{errors.password}</span>
          )}
        </label>
        {isError.register && (
          <p className="register__error-message">
            {isError.register === 409
              ? "Пользователь с таким email уже сущетсвует"
              : "При регистрации пользователя произошла ошибка"}
          </p>
        )}
        <button
          className="register__button"
          type="submit"
          onSubmit={handleSubmit}
          disabled={disabled}
        >
          Зарегистрироваться
        </button>{" "}
        <div className="register__signin">
          <p className="register__text">Уже зарегистрированы? </p>
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
