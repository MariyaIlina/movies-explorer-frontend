import React from "react";
import Footer from "../../components/Footer/Footer";
import Burger from "../../components/Burger/Burger";
import SavedMovies from "../../components/SavedMovies/SavedMovies";
import HeaderMain from "../../components/HeaderMain/HeaderMain";

const SavedMoviesPage = ({
  handleClick,
  menuActive,
  toggleMenu,
  isLoggedIn,
  movies,
  savedMovies,
  setIsShortMovies,
  isShortMovies,
  filterMovies,
  handleMovieDelete,
}) => {


  return (
    <>
      <HeaderMain handleClick={handleClick} isLoggedIn={isLoggedIn} />
      <SavedMovies
        movies={movies}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        filterMovies={filterMovies}
        handleMovieDelete={handleMovieDelete}
        savedMovies={savedMovies}
      />
      <Footer />
      <Burger isOpen={menuActive} onClose={toggleMenu} />
    </>
  );
};

export default SavedMoviesPage;
