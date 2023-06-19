import React, {useEffect, useState}from "react";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import More from "../More/More";

function Movies() { ;

  return (
    <>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      <More />
      {/* <Footer /> */}
    </>
  );
}

export default Movies;
