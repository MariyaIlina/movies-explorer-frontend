import React, { useContext, useState, useEffect } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //   const currentUser = useContext(CurrentUserContext);

  //   useEffect(() => {
  //     if (currentUser.currentUser.name !== undefined) {
  //       setName(currentUser.currentUser.name);
  //     }
  //     if (currentUser.currentUser.email !== undefined) {
  //       setDescription(currentUser.currentUser.email);
  //     }
  //   }, [currentUser, props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      email: description,
    });
  }
  return (
    <div className="profile">
      {/* <Header /> */}
      <p className="profile__entry">Привет, {name}!</p>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__box">
          {" "}
          <label for="name" className="profile__label">
            Имя
          </label>
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
          ></input>{" "}
        </div>
        <div className="profile__line"></div>
        <div className="profile__box">
          <label for="name" className="profile__label">E-mail
          </label>
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
          />
        </div>
      </form>
      <button className="profile__button">Редактировать</button>
      <Link className="profile__logout">Выйти из аккаунта</Link>
    </div>
  );
}

export default Profile;
