import React from "react";
import "./AboutMe.css";
import Line from "../Line/Line";
import { Link } from "react-router-dom";
import avatar from "../../images/avatar.svg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <div className="aboutMe" id="aboutMe">
      <h1 className="aboutMe__title">Студент</h1>
      <Line />
      <div className="aboutMe__grid">
        <div>
          <h2 className="aboutMe__name">Виталий</h2>
          <h3 className="aboutMe__about">Фронтенд-разработчик, 30 лет</h3>
          <p className="aboutMe__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link className="aboutMe___link" to="https://github.com/">
            Github
          </Link>
        </div>{" "}
        <img src={avatar} className="aboutMe__photo"></img>
      </div>
      <Portfolio />
    </div>
  );
}
export default AboutMe;
