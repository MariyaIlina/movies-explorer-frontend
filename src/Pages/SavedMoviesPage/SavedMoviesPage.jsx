import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Burger from "../../components/Burger/Burger";
// import { useNavigate } from "react-router-dom";
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
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <>
      <HeaderMain isLoggedIn={isLoggedIn} onOpen={handleClick} />
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
