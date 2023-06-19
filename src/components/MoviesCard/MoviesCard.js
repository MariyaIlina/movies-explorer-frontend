import React, { useState } from "react";
import "./MoviesCard.css";

function MoviesCard({ title, time, src, alt, cardButton }) {
  return (
    <div className="moviesCard">
      <img className="moviesCard__image" alt={alt} src={src} />
      <div className="moviesCard__info">
        <h1 className="moviesCard__title">{title}</h1>

        <button className={cardButton} type="button"></button>
      </div>
      <p className="moviesCard__time">{time}</p>
    </div>
  );
}
export default MoviesCard;
