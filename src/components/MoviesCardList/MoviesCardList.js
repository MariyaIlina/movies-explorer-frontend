import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import More from "../../components/More/More";
import Preloader from "../Preloader/Preloader";

const API_URL = "https://api.nomoreparties.co/beatfilm-movies";

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
  country,
  director,
}) {
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

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <div className="moviesCardList">
            {movies.length > 0 ? (
              movies
                .slice(0, visibleCards)
                .map((movie) => (
                  <MoviesCard
                    handleMovieSave={handleMovieSave}
                    country={movie.country}
                    director={movie.director}
                    key={movie.id}
                    year={movie.year}
                    // thumbnail={movie.formats.thumbnail}
                    description={movie.description}
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
                ))
            ) : (
              <p>Ничего не найдено</p>
            )}
          </div>
          {movies.length > visibleCards && (
            <More handleLoadMore={handleLoadMore} />
          )}
        </>
      )}
    </>
  );
}
export default MoviesCardList;
