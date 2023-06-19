import React from "react";
import "./AboutProject.css";
import Line from "../Line/Line";

function AboutProject() {
  return (
    <div className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <Line />
      <div className="aboutProject__grid">
        <h3 className="aboutProject__subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="aboutProject__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>{" "}
        <h3 className="aboutProject__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>{" "}
        <p className="aboutProject__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>

      <table>
        <tr>
          <th className="aboutProject__tab aboutProject__tab__back">
            1 неделя
          </th>
          <th className="aboutProject__tab aboutProject__tab__front">
            4 недели
          </th>
        </tr>
        <tr>
          <td className="aboutProject__label">Back-end</td>
          <td className="aboutProject__label">Front-end</td>
        </tr>
      </table>
    </div>
  );
}

export default AboutProject;
