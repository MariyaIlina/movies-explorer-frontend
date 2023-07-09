import React, { useState, useEffect } from "react";
import "./FilterCheckBox.css";

function FilterCheckBox({ movies, setShortMovies, filterMovies }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    setShortMovies(isChecked);
    filterMovies()
  };

  return (
    <>
      <label className="filterCheckBox">
        <input
          className="filterCheckBox__input"
          type="checkbox"
          id="checkbox"
          onInput={(e=>{
            setShortMovies(e.target.checked)
            filterMovies(e.target.checked);
          })}
        />
        <span className="filterCheckBox__inner">Короткометражки</span>
      </label>
    </>
  );
}

export default FilterCheckBox;
