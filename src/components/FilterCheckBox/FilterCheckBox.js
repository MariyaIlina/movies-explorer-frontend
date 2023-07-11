import React, { useState, useEffect } from "react";
import "./FilterCheckBox.css";
import {filterShortMovies} from "../../utils/Filters";

function FilterCheckBox({movies}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (isChecked) {
      filterShortMovies(movies);
    }
  }, [isChecked, filterShortMovies]);


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
