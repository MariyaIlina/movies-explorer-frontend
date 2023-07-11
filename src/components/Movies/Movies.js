import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, filterMovies, moviesDuration, handleMovieSave }) {
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        moviesDuration={moviesDuration}
        
      />
      <MoviesCardList movies={movies} handleMovieSave={handleMovieSave}/>
    </>
  );
}

export default Movies;
