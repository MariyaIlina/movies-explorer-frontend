import React, { useEffect, useState } from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const {
    title,
    time,
    src,
    alt,
    cardButton,
    handleMovieSave,
    movie,
    handleMovieDelete,
    trailerLink,
  } = props;
  const [isActive, setIsActive] = useState(false);

  const handleLikeClick = () => {
    if (isActive || !handleMovieSave) {
      handleMovieDelete(movie);
    } else {
      handleMovieSave(movie);
    }
  };

  useEffect(() => {
    if (movie._id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [movie]);

  

  return (
    <div className="moviesCard">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="moviesCard__image" alt={alt} src={src} />
      </a>
      <div className="moviesCard__info">
        <h1 className="moviesCard__title">{title}</h1>
        <button
          className={`${cardButton}${(isActive && handleMovieSave) ? "_active" : ""}`}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
      <p className="moviesCard__time">{time}</p>
    </div>
  );
}
export default React.memo(MoviesCard);
