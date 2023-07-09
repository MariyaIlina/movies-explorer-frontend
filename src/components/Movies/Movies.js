import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  filterMovies,
  setShortMovies,
  handleMovieSave,
  setSearchQuery,
}) {
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        setShortMovies={setShortMovies}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList movies={movies} handleMovieSave={handleMovieSave} />
    </>
  );
}

export default Movies;
