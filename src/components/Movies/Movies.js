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
  
  const handlerIsShortMovies = (status) => {
    setIsShortMovies(status)
    localStorage.setItem(`isShortMovies_${currentUser._id}`, JSON.stringify(status));
  }
  
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        setIsShortMovies={handlerIsShortMovies}
        isShortMovies={isShortMovies}
        parent='Movies'
      />
      <MoviesCardList
        parent='Movies'
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
