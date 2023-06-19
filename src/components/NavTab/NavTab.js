import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navTab">
      <a className="navTab__link" href="#aboutProject">
        О проекте
      </a>
      <a className="navTab__link" href="#techs">
        Технологии
      </a>
      <a className="navTab__link" href="#aboutMe">
        Студент
      </a>
    </nav>
  );
}
export default NavTab;
