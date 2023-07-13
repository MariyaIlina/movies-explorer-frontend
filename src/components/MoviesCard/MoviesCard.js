import React, { useEffect, useState, useContext } from "react";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({
  title,
  time,
  src,
  alt,
  cardButton,
  handleMovieSave,
  movie,
  // savedMovies,
  handleMovieDelete,
  trailerLink,
}) {
  const [isActive, setIsActive] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  // const [savedMovies, setSavedMovies] = useState(currentUser)
  // const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  

  const handleLikeClick = () => {
    setIsActive((prevState) => !prevState);
    if (isActive) {
      handleMovieDelete(movie);
    } else {
      handleMovieSave(movie);
    }
  };
    
  
  // useEffect(() => {});
  // const [movies, setMovies]=useState([]);

   
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("filteredMovies"));
    console.log('movies=>', movies)//массив со всеми фильмами на странице
    const savedMovies = currentUser.savedMovies;
    console.log('savedMovies=>', savedMovies)// массив сохраненных фильмов
   const updatedMovies = movies.map((movie) => {

   })

  }, []);

  return (
    <div className="moviesCard">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="moviesCard__image" alt={alt} src={src} />
      </a>
      <div className="moviesCard__info">
        <h1 className="moviesCard__title">{title}</h1>
        <button
          className={`${cardButton}${isActive ? "_active" : ""}`}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
      <p className="moviesCard__time">{time}</p>
    </div>
  );
}
export default MoviesCard;
