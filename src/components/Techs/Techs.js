import React from "react";
import "./Techs.css";
import Line from "../Line/Line";

function Techs() {
  return (
    <div className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <Line />
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__block">
        <p className="techs__label">HTML</p>
        <p className="techs__label">CSS</p>
        <p className="techs__label">JS</p>
        <p className="techs__label">React</p>
        <p className="techs__label">Git</p>
        <p className="techs__label">Express.js</p>
        <p className="techs__label">mongoDB</p>
      </div>
    </div>
  );
}
export default Techs;
