import React from "react";
import "./FilterCheckBox.css";

function FilterCheckBox({ setIsShortMovies, isShortMovies }) {

  return (
    <>
      <label className="filterCheckBox">
        <input
          className="filterCheckBox__input"
          type="checkbox"
          id="checkbox"
          checked={isShortMovies}
          onChange={() => setIsShortMovies(!isShortMovies)}
        />
        <span className="filterCheckBox__inner">Короткометражки</span>
      </label>
    </>
  );
}

export default FilterCheckBox;
