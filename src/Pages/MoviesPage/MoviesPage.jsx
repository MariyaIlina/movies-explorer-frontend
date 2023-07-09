import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Burger from "../../components/Burger/Burger";
import { useNavigate } from "react-router-dom";
import Movies from "../../components/Movies/Movies";
import HeaderMain from "../../components/HeaderMain/HeaderMain";

const MoviesPage = ({
  handleClick,
  menuActive,
  toggleMenu,
  isLoggedIn,
  movies,
  filterMovies,
 setShortMovies,
  handleMovieSave,
  setSearchQuery,
}) => {
  return (
    <>
      <HeaderMain handleClick={handleClick} isLoggedIn={isLoggedIn} />
      <Movies
        movies={movies}
        filterMovies={filterMovies}
        setShortMovies={setShortMovies}
        handleMovieSave={handleMovieSave}
        setSearchQuery={setSearchQuery}
      />
      <Footer />
      <Burger isOpen={menuActive} onClose={toggleMenu} />
    </>
  );
};

export default MoviesPage;
