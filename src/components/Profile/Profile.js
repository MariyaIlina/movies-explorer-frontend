import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../Validate/Validate";

function Profile({ onUpdateUser, logOut }) {
  const { currentUser, isError } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [editingMode, setEditingMode] = useState(false);

  useEffect(() => {
    if (currentUser?.name) {
      resetForm({ name: currentUser.name, email: currentUser.email });
    }
  }, [currentUser]);

  useEffect(() => {
    if(isError.updateUser === 400){
       resetForm({name: currentUser.name, email: currentUser.email})
    }
  }, [isError.updateUser, currentUser])
  

  function handleNameChange(e) {
    const regExpName = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    const value = e.target.value;
    if (value < 1) {
      handleChange(e);
    } else if (regExpName.test(value)) {
      handleChange(e);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (editingMode) {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
    }
    setEditingMode(!editingMode);
  }

  return (
    <div className="profile">
      <p className="profile__entry">Привет, {values.name}!</p>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__error_box">
        <div className="profile__box">
          <label className="profile__label">Имя</label>
          <input
            className={`profile__input ${
              errors.name && "profile__input-error"
            }`}
            name="name"
            type="text"
            minLength="2"
            maxLength="40"
            id="profile-name"
            value={values.name || ""}
            onChange={handleNameChange}
            disabled={!editingMode}
            required
          />
        </div>
        {errors.name && (
          <span className="profile__input_error">{errors.name}</span>
        )}
        </div>
        <div className="profile__line"></div>
        <div className="profile__error_box">
        <div className="profile__box">
          <label className="profile__label">E-mail</label>
          <input
            className={`profile__input ${
              errors.email && "profile__input-error"
            }`}
            name="email"
            required
            type="email"
            id="profile-email"
            value={values.email || ""}
            onChange={handleChange}
            disabled={!editingMode}
          />
        </div>

        {errors.email && (
          <span className="profile__input_error">{errors.email}</span>
        )}
        {isError.updateUser && (
          <p className="profile__message">
            {isError.updateUser === 400
              ? "При обновлении профиля произошла ошибка"
              : "Пользователь с таким email уже сществует"}
          </p>
        )}
        </div>
        {isError.updateUserSuccessfully && (
          <p className="profile__input-successfully">
            Профиль успешно обновлен
          </p>
        )}
        {editingMode ? (
          <>
            <button type="submit" disabled={!isValid} className="profile__save">
              Сохранить
            </button>
          </>
        ) : (
          <button
            className="profile__button"
            onClick={() => setEditingMode(true)}
          >
            Редактировать
          </button>
        )}

        <Link className="profile__logout" onClick={logOut} to="/">
          Выйти из аккаунта
        </Link>
      </form>
    </div>
  );
}

export default Profile;
