import React, { useContext, useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import More from "../../components/More/More";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const DEVICE_PARAMS = {
  desktop: {
    width: 1280,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 768,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 500,
    cards: {
      total: 5,
      more: 2,
    },
  },
};

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins < 10 ? "0" : ""}${mins} м`;
}

function MoviesCardList({
  movies,
  isLoading,
  isError,
  handleMovieSave,
  savedMovies,
  handleMovieDelete,
}) {
  // console.log('MoviesCardList handleMovieDelete', handleMovieDelete);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();
  const [visibleCards, setVisibleCards] = useState(
    DEVICE_PARAMS.desktop.cards.total
  ); // Количество отображаемых карточек
  const [loadMoreCards, setLoadMoreCards] = useState(
    DEVICE_PARAMS.desktop.cards.more
  ); // Количество загружаемых карточек

  const handleResize = () => {
    const width = window.innerWidth;

    if (width >= DEVICE_PARAMS.desktop.width) {
      setVisibleCards(DEVICE_PARAMS.desktop.cards.total);
      setLoadMoreCards(DEVICE_PARAMS.desktop.cards.more);
    } else if (width >= DEVICE_PARAMS.tablet.width) {
      setVisibleCards(DEVICE_PARAMS.tablet.cards.total);
      setLoadMoreCards(DEVICE_PARAMS.tablet.cards.more);
    } else {
      setVisibleCards(DEVICE_PARAMS.mobile.cards.total);
      setLoadMoreCards(DEVICE_PARAMS.mobile.cards.more);
    }
  };

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + loadMoreCards);
  };

  const currentUser = useContext(CurrentUserContext);
  // const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  // console.log(currentUser.savedMovies);
  // console.log('MoviesCardList=>', savedMovies)
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : isError ? (
        <p>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      ) : (
        <>
          {location.pathname === "/movies" ? (
            <>
              {movies.length > 0 ? (
                <div className="moviesCardList">
                  {movies.slice(0, visibleCards).map((movie) => (
                    <MoviesCard
                      handleMovieSave={handleMovieSave}
                      handleMovieDelete={handleMovieDelete}
                      trailerLink={movie.trailerLink}
                      savedMovies={savedMovies}
                      key={movie.id}
                      movie={movie}
                      title={movie.nameRU}
                      time={formatTime(movie.duration)}
                      src={`https://api.nomoreparties.co${movie.image.url}`}
                      alt={movie.image.name}
                      cardButton={
                        location.pathname === "/movies"
                          ? "moviesCard__like"
                          : "moviesCard__remove"
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="moviesCardList__notFound">Ничего не найдено</p>
              )}
              {movies.length > visibleCards && (
                <More handleLoadMore={handleLoadMore} />
              )}
            </>
          ) : (
            <>
              {savedMovies.length > 0 ? (
                <div className="moviesCardList">
                  {savedMovies.slice(0, visibleCards).map((movie) => (
                    <MoviesCard
                      handleMovieDelete={handleMovieDelete}
                      key={movie._id}
                      savedMovies={savedMovies}
                      movie={movie}
                      trailerLink={movie.trailerLink}
                      title={movie.nameRU}
                      time={formatTime(movie.duration)}
                      src={movie.image}
                      alt={movie.image}
                      cardButton={
                        location.pathname === "/movies"
                          ? "moviesCard__like"
                          : "moviesCard__remove"
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="moviesCardList__notFound">Ничего не найдено</p>
              )}{" "}
              {savedMovies.length > visibleCards && (
                <More handleLoadMore={handleLoadMore} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
export default MoviesCardList;
