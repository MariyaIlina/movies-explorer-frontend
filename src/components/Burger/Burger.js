import "./Burger.css";
import { Link, useLocation } from "react-router-dom";

function Burger({ active, setActive, isOpen, onClose }) {
  const location = useLocation();

  return (
    <div className={`burger ${isOpen ? "burger_is-opened" : ""}`}>
      <div
        className={`burger__container ${
          isOpen ? "burger__container_is-opened" : ""
        }`}
      >
        <div className="burger__links">
          <button className="burger__close" onClick={onClose}></button>
          <h1 className="burger__title">Главная</h1>
          <Link
            className={`burger__link ${
              location.pathname === "/movies" ? "burger__link_is-active" : ""
            }`}
            to="/movies"
          >
            Фильмы
          </Link>
          <Link
            className={`burger__link ${
              location.pathname === "/saved-movies"
                ? "burger__link_is-active"
                : ""
            }`}
            to="/saved-movies"
          >
            Сохраненные фильмы
          </Link>
        </div>
        <Link className="burger__acount" to="/profile">
          Аккаунт
        </Link>
        <div className="blur" />
      </div>
    </div>
  );
}

export default Burger;
