import React, { useState, useContext, useEffect } from "react";
import "./SearchForm.css";
import icon from "../../images/find.svg";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SearchForm({
  filterMovies,
  setIsShortMovies,
  isShortMovies,
  parent
}) {
  const {currentUser, movies : allMovies} = useContext(CurrentUserContext);
  const [query, setQuery] = useState("");
  const [isValid, setIsValid] = useState(true);
  
  useEffect(() => {
    const searchMovies = localStorage.getItem(`search${parent}_${currentUser._id}`);
    
    if(searchMovies && allMovies.length > 0){
      setQuery(searchMovies);
      filterMovies(searchMovies, parent);
    }
  }, [currentUser, allMovies])

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if(query.length === 0 ){
      setIsValid(false)
    } else {
      setIsValid(true)
      if(parent === 'Movies'){
        localStorage.setItem(`search${parent}_${currentUser._id}`, query);
      }

      filterMovies(query, parent);
    }
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
              setQuery(e.target.value);
            }}
            value={query}
          />
          <button className="searchForm__button">
            <img src={icon} className="searchForm__img" alt="поиск" />
          </button>
         {!isValid && <span className="searchForm__error">Нужно ввести ключевое слово</span>}
        </div>
        <FilterCheckBox setIsShortMovies={setIsShortMovies} isShortMovies={isShortMovies} />
      </div>
      <div className="searchForm__line"></div>
    </form>
  );
}
export default SearchForm;
