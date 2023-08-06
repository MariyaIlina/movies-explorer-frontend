import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFound">
      <h1 className="notFound__title">404</h1>
      <p className="notFound__text">Страница не найдена</p>
      <button className="notFound__button" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
}

export default NotFound;
