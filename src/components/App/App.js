import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
// import RegisterPage from "../../Pages/Register/Register";
import Register from "../Register/Register";
import Profile from "../../Pages/ProfilePage/ProfilePage";
import Login from "../Login/Login";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MainPage from "../../Pages/MainPage/MainPage";
import MoviesPage from "../../Pages/MoviesPage/MoviesPage";
import MoviesApi from "../../utils/MoviesApi";
import Auth from "../../utils/auth";
import SavedMoviesPage from "../../Pages/SavedMoviesPage/SavedMoviesPage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const auth = new Auth();

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]); //все фильмы
  const [isError, setIsError] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]); //фильмы найденные по поиску
  const [shortMovies, setShortMovies] = useState([]); //короткометражные фильмы
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [isShortMovies, setIsShortMovies] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user.user);
          getMovies(token);
          const moviesFromStorage = JSON.parse(
            localStorage.getItem("filteredMovies")
          );
          const shortMoviesFromStorage = JSON.parse(
            localStorage.getItem("shortFilteredMovies")
          );

          if (moviesFromStorage.length && shortMoviesFromStorage.length) {
            if (savedMovies?.length) {
              const newMuvies = moviesFromStorage.map((item) => {
                const newItem = savedMovies.find(
                  (saved) => saved.movieId === item.id
                );
                if (newItem) {
                  // console.log('newItem', newItem);
                  item._id = newItem._id;
                  // console.log('newItem item', item);
                }

                return item;
              });
              setFilteredMovies(newMuvies);
            } else {
              setFilteredMovies(moviesFromStorage);
            }

            setShortMovies(shortMoviesFromStorage);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [isLoggedIn, navigate, savedMovies]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoggedIn && token) {
      Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
        .then(([resUser, resSavedMovies]) => {
          console.log(resSavedMovies);
          setCurrentUser(resUser);
          setSavedMovies(resSavedMovies);
        })
        .catch(() => {
          console.log(`Ошибка при загрузке данных пользователя и карточек.`);
        });
    }
  }, [isLoggedIn]);

  function register({ name, email, password }) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((data) => {
        console.log(data);
        login({ name, email, password });
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  }

  function login({ email, password }) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Ошибка при входе в систему: ${err}`);
        setIsError(true);
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res);
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных: ${err}`);
        setIsLoading(false);

        return [];
      });
  }

  function filterMovies(query) {
    const lowerCaseQuery = query.toLowerCase();

    const filteredAllMovies = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().indexOf(query) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(query) !== -1
    );

    const filteredShortMovies = filteredAllMovies.filter(
      (movie) => movie.duration <= 40
    );

    localStorage.setItem("filteredMovies", JSON.stringify(filteredAllMovies));
    localStorage.setItem(
      "shortFilteredMovies",
      JSON.stringify(filteredShortMovies)
    );
    localStorage.setItem("isShortMovies", isShortMovies);

    setFilteredMovies(filteredAllMovies);
    setShortMovies(filteredShortMovies);
  }

  function getMovies(token) {
    setIsLoading(true);
    moviesApi
      .getMovies(token)
      .then((res) => {
        setIsLoading(false);
        setMovies(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err);
        console.log(err);
      });
  }

  function toggleMenu() {
    setMenuActive(!menuActive);
  }
  function handleClick() {
    toggleMenu();
  }

  function handleMovieSave(movieCard) {
    mainApi
      .saveMovie(movieCard)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
        const savedMoviesStringify = JSON.stringify(savedMovies);
        localStorage.setItem("savedMovies", savedMoviesStringify);

        const newFilteredMovies = filteredMovies.map((item) => {
          if (savedMovie.movie.movieId === item.id) {
            return { ...item, _id: savedMovie.movie._id };
          }
          return item;
        });
        setFilteredMovies(newFilteredMovies);

        // console.log("App.savedMovie=>", savedMovie);
        console.log("App.savedMovie id=>", savedMovie.movie._id);
        console.log(`Карточка сохранена.`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDelete(movie) {
    console.log("handleMovieDelete movie", movie);

    const movieId = movie._id;
    // console.log("handleMovieDelete", movieId);
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies(
          (savedMovies) => {
            console.log("savedMovies", savedMovies);
            return savedMovies.filter(
              (savedMovie) => savedMovie._id !== movieId
            );
          }
          //
        );
        // console.log('newFilteredMovies');
        const newFilteredMovies = filteredMovies.map((item) => {

          if (movieId === item._id) {
            console.log('movieId === ', movieId, item._id);
            console.log('movieId === item.id');
            delete item._id;
            console.log('movieId === item', item);
            return {...item};
          }
          return item;
        })
        setFilteredMovies(newFilteredMovies);
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  }

  function logOut() {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("isShortMovies");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("token");
    localStorage.removeItem("shortFilteredMovies");
    navigate("/");
  }
  return (
    <div>
      <CurrentUserContext.Provider value={{ currentUser, savedMovies }}>
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                menuActive={menuActive}
                handleClick={handleClick}
                toggleMenu={toggleMenu}
                isLoggedIn={isLoggedIn}
                movies={filteredMovies}
                shortMovies={shortMovies}
                element={MoviesPage}
                setIsShortMovies={setIsShortMovies}
                isShortMovies={isShortMovies}
                filterMovies={filterMovies}
                handleMovieSave={handleMovieSave}
                handleMovieDelete={handleMovieDelete}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                handleClick={handleClick}
                menuActive={menuActive}
                toggleMenu={toggleMenu}
                isLoggedIn={isLoggedIn}
                element={SavedMoviesPage}
                setIsShortMovies={setIsShortMovies}
                isShortMovies={isShortMovies}
                filterMovies={filterMovies}
                savedMovies={savedMovies}
                handleMovieDelete={handleMovieDelete}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                handleClick={handleClick}
                menuActive={menuActive}
                toggleMenu={toggleMenu}
                logOut={logOut}
                element={ProfilePage}
                onUpdateUser={handleUpdateUser}
              />
            }
          />

          <Route path="/signup" element={<Register register={register} />} />
          <Route path="/signin" element={<Login login={login} />} />

          <Route
            path="/"
            element={
              <MainPage
                isLoggedIn={isLoggedIn}
                menuActive={menuActive}
                toggleMenu={toggleMenu}
                handleClick={handleClick}
              />
            }
          />
          <Route
            path="/*"
            element={
              <MainPage isLoggedIn={isLoggedIn} handleClick={handleClick} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
