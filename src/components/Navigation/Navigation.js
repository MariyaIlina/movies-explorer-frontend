import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="header__navigation">
      <div>
        <Link className="header__link header__link-film" to="/movies">
          Фильмы
        </Link>
        <Link className="header__link header__link-savefilm" to="/saved-movies">
          Сохраненные фильмы
        </Link>
      </div>
      <Link className="header__button" to="/profile">
        Аккаунт
      </Link>
    </div>
  );
}
export default Navigation;
