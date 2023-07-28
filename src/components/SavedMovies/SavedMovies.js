import React, { useState, useContext, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "../SavedMovies/SavedMovies.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies({
  movies,savedMovies,
  filterMovies,
  handleMovieDelete,
  isLoading,
}) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const {currentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    if(currentUser._id){
      const isShortMovies = localStorage.getItem(`isShortSavedMovies_${currentUser._id}`);
      if(isShortMovies){
        setIsShortMovies(JSON.parse(isShortMovies))
      }
    }
  }, [currentUser])
  
  const handlerIsShortMovies = (status) => {
    setIsShortMovies(status)
    localStorage.setItem(`isShortSavedMovies_${currentUser._id}`, JSON.stringify(status));
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
