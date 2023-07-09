import React, { useState } from "react";
import "./MoviesCard.css";

function MoviesCard({
  title,
  time,
  src,
  alt,
  cardButton,
  handleMovieSave,
  nameRU,
  nameEN,
  director,
  country,
  key,
  year,
  thumbnail,
  description,
}) {
  const [isActive, setIsActive] = useState(false);

  const handleLikeClick = () => {
    setIsActive((prevState) => !prevState);
    handleMovieSave({
      title,
      time,
      src,
      alt,
      cardButton,
      handleMovieSave,
      nameRU,
      nameEN,
      director,
      country,
      key,
      year,
      thumbnail,
      description,
    }, localStorage.getItem('token'));
  };

  return (
    <div className="moviesCard">
      <img className="moviesCard__image" alt={alt} src={src} />
      <div className="moviesCard__info">
        <h1 className="moviesCard__title">{title}</h1>
        <button
          className={`${cardButton}${isActive ? "_active" : ""}`}
          type="button"
          onClick={() => handleLikeClick()}
        ></button>
      </div>
      <p className="moviesCard__time">{time}</p>
    </div>
  );
}
export default MoviesCard;
