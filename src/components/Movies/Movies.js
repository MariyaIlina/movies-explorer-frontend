import React, { useContext, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies({
  movies,
  filterMovies,
  handleMovieSave,
  isLoading,
  handleMovieDelete,
}) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const {currentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    if(currentUser._id){
      const isShortdMovies = localStorage.getItem(`isShortMovies_${currentUser._id}`);
      if(isShortdMovies){
        setIsShortMovies(JSON.parse(isShortdMovies))
      }
    }
  }, [currentUser])
  
  useEffect(() => {
    if(currentUser._id){
      localStorage.setItem(`isShortMovies_${currentUser._id}`, JSON.stringify(isShortMovies));
    }
  }, [currentUser, isShortMovies])

  
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        parent='Movies'
      />
      <MoviesCardList
        movies={movies}
        isShortMovies={isShortMovies}
        handleMovieSave={handleMovieSave}
        isLoading={isLoading}
        handleMovieDelete={handleMovieDelete}
      />
    </>
  );
}

export default Movies;
