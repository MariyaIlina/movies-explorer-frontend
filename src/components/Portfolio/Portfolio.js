import "./Portfolio.css";
import { Link } from "react-router-dom";
import link from "../../images/link.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <a
        className="portfolio__link"
        href="https://mariyailina.github.io/how-to-learn/" target="_blank" rel="noopener noreferrer"
      >
        <p className="portfolio__link-name">Статичный сайт</p>
        <img src={link} className="portfolio__img" alt="ссылка"></img>
      </a>
      <div className="portfolio__line"></div>
      <a
        className="portfolio__link"
        href="https://mariyailina.github.io/russian-travel/index.html" target="_blank" rel="noopener noreferrer"
      >
        <p className="portfolio__link-name">Адаптивный сайт</p>
        <img src={link} className="portfolio__img" alt="ссылка"></img>
      </a>
      <div className="portfolio__line"></div>
      <a
        className="portfolio__link"
        href="https://mariyailina.github.io/mesto/src/index.html" target="_blank" rel="noopener noreferrer"
      >
        <p className="portfolio__link-name">Одностраничное приложение</p>
        <img src={link} className="portfolio__img" alt="ссылка"></img>
      </a>
    </div>
  );
}
export default Portfolio;
