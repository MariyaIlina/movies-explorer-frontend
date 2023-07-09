import React from "react";
import logo from "../../images/logo__green.svg";
import logo1 from "../../images/logo__white.svg";
import { Link } from "react-router-dom";
import "../Navigation/Navigation";
import "./HeaderSign.css";

function HeaderSign() {
  return (
    <header className="header header_sign">
      <div className="header__nav">
        <Link to="/" className="header__logo header__logo_sign">
          <img src={logo} alt="логотип" className="header__logo2" />
          <img src={logo1} alt="логотип" className="header__logo1" />
        </Link>
      </div>
    </header>
  );
}
export default HeaderSign;
