import React from "react";
import logo from "../../images/logo__green.svg";
import logo1 from "../../images/logo__white.svg";
import { Link } from "react-router-dom";
import "../Navigation/Navigation";
import "./HeaderMain.css";
import Navigation from "../Navigation/Navigation";

function HeaderMain({ handleClick, isLoggedIn }) {
  return (
    <header className="header header_movies">
      <div className="header__nav">
        <Link to="/" className="header__logo header__logo_none">
          <img src={logo} alt="логотип" className="header__logo2" />
          <img src={logo1} alt="логотип" className="header__logo1" />
        </Link>
      </div>
      {isLoggedIn && (
        <>
          <Navigation />
          <button className="header__burger" onClick={handleClick}></button>
        </>
      )}
      {!isLoggedIn && (
        <div className="header__block">
          <Link className="header__link header__link_register" to="/signup">
            Pегистрация
          </Link>
          <button className="header__button header__button_signin">
            <Link className="header__link header__link_signin" to="/signin">
              Войти
            </Link>
          </button>
        </div>
      )}
    </header>
  );
}
export default HeaderMain;
