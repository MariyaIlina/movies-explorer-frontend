import React, { useState } from "react";
import "./FilterCheckBox.css";

function FilterCheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
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
        />{" "}
        <span className="filterCheckBox__inner">Короткометражки</span>
      </label>
    </>
  );
}

export default FilterCheckBox;
