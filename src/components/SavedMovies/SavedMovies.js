import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import '../SavedMovies/SavedMovies.css'
import More from "../More/More";

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      {/* <More /> */}
      <div className="savedMovies"></div>
    
    </>
  );
}
export default SavedMovies;
