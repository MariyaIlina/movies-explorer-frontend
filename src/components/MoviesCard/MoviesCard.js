import React, { useEffect, useState, useContext } from "react";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
  const {
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
    id,
  } = props;
  const [isActive, setIsActive] = useState(false);
  const [_id, setId] = useState(false);
  // const [activeId, setIsActive] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  // console.log('MoviesCard props', props);
  // const [savedMovies, setSavedMovies] = useState(currentUser)
  // const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));

  const handleLikeClick = () => {
    // setIsActive((prevState) => !prevState);
    if (isActive) {
      movie._id = _id; /// TODO подумать как убрать замыкание movie
      console.log("handleLikeClick movie", movie, _id);
      // movie._id = _id;
      handleMovieDelete(movie);
    } else {
      handleMovieSave(movie);
    }
  };
  // console.log("MoviesCard movie", movie);

  // useEffect(() => {});
  // const [movies, setMovies]=useState([]);

  useEffect(() => {
    console.log("movie saved", movie);
    if (movie._id) {
      setIsActive(true);
      // setId(movie._id);
    } else {
      setIsActive(false);
      // setId(false)
    }
  }, [movie]);

  // useEffect(() => {
  //   // const movies = JSON.parse(localStorage.getItem("filteredMovies"));
  //   // console.log('movies=>', movies)//массив со всеми фильмами на странице

  //   if (!movie._id) {
  //     const savedMovies = currentUser.savedMovies;
  //     // console.log('savedMovies=>', savedMovies)// массив сохраненных фильмов

  //     const active = savedMovies.find((item) => item.movieId === movie.id);
  //     if (active) {
  //       console.log("movie", active._id);
  //       movie._id = active._id;
  //       console.log("movie", movie);
  //       setIsActive(true);
  //       setId(active._id);
  //     }
  //   } else {
  //     setIsActive(true);
  //     setId(movie._id);
  //   }

  //   // const updatedMovies = movies.map((movie) => {

  //   //   const item = savedMovies.find((saved)=>{ return saved.movieId === movie.id})
  //   //   if(item){
  //   //     movie._id = item._id
  //   //     // return
  //   //   }
  //   //   return movie
  //   // })
  //   // console.log('updatedMovies=>', updatedMovies)// массив сохраненных фильмов
  // }, []);

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
