import React, { useState } from "react";
import "./SearchForm.css";
import icon from "../../images/find.svg";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Line from "../Line/Line"

function SearchForm({
  handleClick,
  handleChange,
  filterMovies,
  setShortMovies,
  setSearchQuery,
}) {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    filterMovies();
  };
  return (
    <form onSubmit={handleSubmitForm} className="searchForm">
      <div className="searchForm__box">
        <div className="searchForm__form">
          <input
            type="text"
            className="searchForm__input"
            placeholder="Фильм"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            required
          />
          <button className="searchForm__button" onClick={handleClick}>
            <img src={icon} className="searchForm__img" alt="поиск" />
          </button>
        </div>
        <FilterCheckBox setShortMovies={setShortMovies} filterMovies={filterMovies} />
      </div>
      <div className="searchForm__line"></div>
    </form>
  );
}
export default SearchForm;
