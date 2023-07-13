import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "../SavedMovies/SavedMovies.css";
import More from "../More/More";

function SavedMovies({
  movies,savedMovies,
  setIsShortMovies,
  isShortMovies,
  filterMovies,
  handleMovieDelete,
}) {
  return (
    <>
      <SearchForm
        filterMovies={filterMovies}
        setIsShortMovies={setIsShortMovies}
      />
      <MoviesCardList
        movies={movies}
        handleMovieDelete={handleMovieDelete}
        savedMovies={savedMovies}
      />
      <div className="savedMovies"></div>
    </>
  );
}
export default SavedMovies;
