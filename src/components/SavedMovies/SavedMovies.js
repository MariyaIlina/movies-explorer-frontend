import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "../SavedMovies/SavedMovies.css";

function SavedMovies({
  movies,
  savedMovies,
  filterMovies,
  handleMovieDelete,
  isLoading,
}) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  
  const handlerIsShortMovies = (status) => {
    setIsShortMovies(status)
  }
 
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        setIsShortMovies={handlerIsShortMovies}
        isShortMovies={isShortMovies}
        parent='SavedMovies'
      />
      <MoviesCardList
        parent='SavedMovies'
        movies={movies}
        isShortMovies={isShortMovies}
        handleMovieDelete={handleMovieDelete}
        savedMovies={savedMovies}
        isLoading={isLoading}
      />
      <div className="savedMovies"></div>
    </>
  );
}
export default SavedMovies;
