import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Burger from "../../components/Burger/Burger";
import { useNavigate } from "react-router-dom";
import Movies from "../../components/Movies/Movies";
import HeaderMain from "../../components/HeaderMain/HeaderMain";

const MoviesPage = ({
  handleClick,
  shortMovies,
  menuActive,
  toggleMenu,
  isLoggedIn,
  movies,
  filterMovies,
  handleMovieSave,
  setSearchQuery,
  setIsShortMovies,
  isShortMovies,
  isLoading,
}) => {
  return (
    <>
      <HeaderMain handleClick={handleClick} isLoggedIn={isLoggedIn} />
      <Movies
        movies={movies}
        shortMovies={shortMovies}
        filterMovies={filterMovies}
        setIsShortMovies={setIsShortMovies}
        handleMovieSave={handleMovieSave}
        setSearchQuery={setSearchQuery}
        isShortMovies={isShortMovies}
        isLoading={isLoading}
      />
      <Footer />
      <Burger isOpen={menuActive} onClose={toggleMenu} />
    </>
  );
};

export default MoviesPage;
