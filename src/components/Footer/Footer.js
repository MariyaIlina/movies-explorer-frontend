import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line"></div>
      <div className="footer__nav">
        <p className="footer__copyright">© {new Date().getFullYear()} </p>
        <div className="footer__block">
          <Link className="footer__link" to="https://practicum.yandex.ru/">
            Яндекс.Практикум
          </Link>
          <Link className="footer__link" to="https://github.com/">
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
