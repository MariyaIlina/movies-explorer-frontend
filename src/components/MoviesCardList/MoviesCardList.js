import React, { useEffect, useState } from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
const API_URL = "https://api.nomoreparties.co/beatfilm-movies";

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins < 10 ? "0" : ""}${mins} м`;
  }
  

function MoviesCardList (){
    const [movies, setMovies] = useState([]);
const location = useLocation();
    useEffect(() => {
        fetch(`${API_URL}`)
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="moviesCardList">
            {movies.slice(0, 12).map((movie) => (
                <MoviesCard
                    key={movie.id}
                    title={movie.nameRU}
                    time={formatTime(movie.duration)}
                    src={`https://api.nomoreparties.co${movie.image.url}`}
                    alt={movie.image.name}
                    cardButton={location.pathname === '/movies' ? 'moviesCard__like' : 'moviesCard__remove'}
                />
                
            ))}
        </div>
    );
}
export default MoviesCardList;