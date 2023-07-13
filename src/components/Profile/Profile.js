import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({ onUpdateUser, logOut}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const [currentUserData, setCurrentUserData] = useState(currentUser.currentUser)
const [editingMode, setEditingMode] = useState(false);

  useEffect(() => {
    if (currentUserData.name !== undefined) {
  
      setName(currentUserData.name);
    }
    if (currentUserData.email !== undefined) {
      setDescription(currentUserData.email);
    }
  }, [currentUserData]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingMode) {
      onUpdateUser({
        name,
        email: description,
      });
    }
  setEditingMode(!editingMode);

  }
  return (
    <div className="profile">
      <p className="profile__entry">Привет, {name}!</p>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__box">
          {" "}
          <label className="profile__label">Имя</label>
          <input
            className="profile__input"
            name="name"
            required
            type="text"
            minLength="2"
            maxLength="40"
            id="profile-name"
            value={name}
            onChange={handleNameChange}
            disabled={!editingMode}
          ></input>
        </div>
        <div className="profile__line"></div>
        <div className="profile__box">
          <label className="profile__label">E-mail</label>
          <input
            className="profile__input"
            name="email"
            required
            type="text"
            minLength="2"
            maxLength="200"
            id="profile-email"
            value={description}
            onChange={handleDescriptionChange}
            disabled={!editingMode}
          />
        </div>
        {editingMode ? (
          <>
            <button type="submit" className="profile__save">
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
