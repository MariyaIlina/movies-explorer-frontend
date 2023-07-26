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
  
  useEffect(() => {
    if(currentUser._id){
      localStorage.setItem(`isShortSavedMovies_${currentUser._id}`, JSON.stringify(isShortMovies));
    }
  }, [currentUser, isShortMovies])
  
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        parent='SavedMovies'
      />
      <MoviesCardList
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
