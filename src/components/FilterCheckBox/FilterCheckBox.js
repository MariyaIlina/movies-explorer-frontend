import React, { useState, useEffect } from "react";
import "./FilterCheckBox.css";

function FilterCheckBox({ setIsShortMovies }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checkboxStatus = localStorage.getItem("isShortMovies");
    if (checkboxStatus) {
      setIsChecked(checkboxStatus === "true" ? true : false);
    }
  }, []);

  const handleChange = () => {
    setIsChecked(!isChecked);
    setIsShortMovies(!isChecked);
    localStorage.setItem("isShortMovies", !isChecked);
  };

  return (
    <>
      <label className="filterCheckBox">
        <input
          className="filterCheckBox__input"
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="filterCheckBox__inner">Короткометражки</span>
      </label>
    </>
  );
}

export default FilterCheckBox;
