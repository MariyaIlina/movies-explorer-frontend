import React, { useState } from "react";
import logo from "../../images/logo__green.svg";
import logo1 from "../../images/logo__white.svg";
import { Link, useLocation } from "react-router-dom";
import "../Navigation/Navigation";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Burger from "../Burger/Burger";

function Header({ navStatus, profile, isMobile, onOpen }) {
  const location = useLocation();

  if (
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile"
  ) {
    return (
      <header className="header header__movies">
        <div className="header__nav">
          <Link to="/" className="header__logo header__logo_none">
            <img src={logo} alt="логотип" className="header__logo2" />
            <img src={logo1} alt="логотип" className="header__logo1" />
          </Link>
        </div>
        <Navigation />
        <button className="header__burger" onClick={onOpen}></button>
      </header>
    );
  } else if (
    location.pathname === "/signup" ||
    location.pathname === "/signin"
  ) {
    return (
      <header className="header header__sign">
        <div className="header__nav">
          <Link to="/" className="header__logo header__logo_sign">
            <img src={logo} alt="логотип" className="header__logo2" />
            <img src={logo1} alt="логотип" className="header__logo1" />
          </Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header header__main">
        <div className="header__nav">
          <Link to="/" className="header__logo">
            <img src={logo} alt="логотип" className="header__logo2" />
            <img src={logo1} alt="логотип" className="header__logo1" />
          </Link>
        </div>
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
      </header>
    );
  }
}

export default Header;
