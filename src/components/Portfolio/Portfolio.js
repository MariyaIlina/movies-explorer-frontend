import "./Portfolio.css";
import { Link } from "react-router-dom";
import link from "../../images/link.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <Link
        className="portfolio__link"
        to="https://github.com/MariyaIlina/how-to-learn"
      >
        <p className="portfolio__link__name">Статичный сайт</p>
        <img src={link} className="portfolio__img" alt="ссылка"></img>
      </Link>
      <div className="portfolio__line"></div>
      <Link
        className="portfolio__link"
        to="https://mariyailina.github.io/russian-travel/index.html"
      >
        <p className="portfolio__link__name">Адаптивный сайт</p>
        <img src={link} className="portfolio__img" alt="ссылка"></img>
      </Link>
      <div className="portfolio__line"></div>
      <Link
        className="portfolio__link"
        to="https://github.com/MariyaIlina/mesto.git"
      >
        <p className="portfolio__link__name">Одностраничное приложение</p>
        <img src={link} className="portfolio__img" alt="ссылка"></img>
      </Link>
    </div>
  );
}
export default Portfolio;
