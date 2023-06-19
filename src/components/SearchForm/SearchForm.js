import React from "react";
import "./SearchForm.css";
import icon from "../../images/find.svg";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Line from "../Line/Line"

function SearchForm({ handleClick, handleChange }) {
  return (
    <div className="searchForm">
      <div className="searchForm__box">
        <div className="searchForm__form">
          <input
            type="text"
            className="searchForm__input"
            placeholder="Фильм"
            onChange={handleChange}
          />
          <button className="searchForm__button" onClick={handleClick}>
            <img src={icon} className="searchForm__img" alt="поиск" />
          </button>
        </div>
        <FilterCheckBox />
      </div>
      <div className="searchForm__line"></div>
    </div>
  );
}
export default SearchForm;
