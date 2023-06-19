import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation__nav">
      <div>
        <Link className="navigation__link navigation__link_film" to="/movies">
          Фильмы
        </Link>
        <Link
          className="navigation__link navigation__link_savefilm"
          to="/saved-movies"
        >
          Сохраненные фильмы
        </Link>
      </div>
      <Link className="navigation__button" to="/profile">
        Аккаунт
      </Link>
    </div>
  );
}
export default Navigation;
