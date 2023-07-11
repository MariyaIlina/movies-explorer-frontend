export function filterMovies(movies, searchQuery) {
  const lowerCaseQuery = searchQuery.toLowerCase();
  if (movies.length) {
    const filteredMoviesArr = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(lowerCaseQuery) ||
        movie.nameEN.toLowerCase().includes(lowerCaseQuery)
    );
    return filteredMoviesArr;
  }
}

export function filterShortMovies(movies) {
  return movies.filter((movie) => movie.duration < 40);
}
