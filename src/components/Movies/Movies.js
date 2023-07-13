import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  filterMovies,
  handleMovieSave,
  setIsShortMovies,
  isShortMovies,
  shortMovies,
  isLoading,
}) {
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        setIsShortMovies={setIsShortMovies}
      />
      <MoviesCardList
        movies={isShortMovies ? shortMovies : movies}
        handleMovieSave={handleMovieSave}
        isLoading={isLoading}
      />
    </>
  );
}

export default Movies;
