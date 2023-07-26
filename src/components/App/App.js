import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MainPage from "../../Pages/MainPage/MainPage";
import MoviesPage from "../../Pages/MoviesPage/MoviesPage";
import moviesApi from "../../utils/MoviesApi";
import SavedMoviesPage from "../../Pages/SavedMoviesPage/SavedMoviesPage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";
import mainApi from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]); //все фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); //фильмы найденные по поиску
  const [isError, setIsError] = useState({});
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]); //сохраненные фильмы найденные по поиску

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (currentUser?._id) {
      setIsLoading(true);
      Promise.all([getSavedMovies(token), moviesApi.getMovies(token)])
        .then(([saved, movies]) => {
          const mySaved = saved.filter(
            (movie) => movie.owner === currentUser._id
          );
          let newMovies = movies;
          if (mySaved.length > 0) {
            newMovies = movies.map((movie) => {
              const ifSaved = saved.find((save) => save.movieId === movie.id);
              if (ifSaved) {
                movie._id = ifSaved._id;
              }
              return movie;
            });
          }
          setSavedMovies(mySaved);
          setMovies(newMovies);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser._id) {
      localStorage.setItem(
        `savedMovies_${currentUser._id}`,
        JSON.stringify(savedMovies)
      );
      setFilteredSavedMovies(savedMovies);
    }
  }, [currentUser, savedMovies]);

  function getSavedMovies(token) {
    const storageSavedMovies = localStorage.getItem(
      `savedMovies_${currentUser._id}`
    );
    if (storageSavedMovies && JSON.parse(storageSavedMovies).length > 0) {
      return Promise.resolve(JSON.parse(storageSavedMovies));
    } else {
      return mainApi.getSavedMovies(token);
    }
  }
  function checkToken(token) {
    mainApi
      .checkToken(token)
      .then(({ user }) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        createError("auth", err);
        setIsLoading(false);
        console.error(`Ошибка при загрузке данных пользователя ${err}`);
      });
  }

  function register({ name, email, password }) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((data) => {
        login({ name, email, password });
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        createError("register", err);
        setIsLoading(false);
      });
  }

  function login({ email, password }) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        checkToken(data.token);

        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Ошибка при входе в систему: ${err}`);
        createError("login", err);
        setIsLoading(false);
      });
  }

  function createError(name, text) {
    setIsError((prev) => ({ ...prev, [name]: text }));
    setTimeout(
      (isError) => {
        delete isError[name];
        setIsError({ ...isError });
      },
      3000,
      isError
    );
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .updateUser(data)
      .then(({ user }) => {
        setCurrentUser(user);
        createError("updateUserSuccessfully", user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных: ${err}`);
        createError("updateUser", err);
        setIsLoading(false);

        return [];
      });
  }

  function filterMovies(query, parent) {
    const lowerCaseQuery = query.toLowerCase();
    const originArr = parent === "Movies" ? movies : savedMovies;
    const filteredAllMovies = originArr.filter(
      (movie) =>
        movie.nameRU.toLowerCase().indexOf(lowerCaseQuery) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(lowerCaseQuery) !== -1
    );
    if (parent === "Movies") {
      setFilteredMovies(filteredAllMovies);
    } else {
      setFilteredSavedMovies(filteredAllMovies);
    }
  }

  function toggleMenu() {
    setMenuActive(!menuActive);
  }
  function handleClick() {
    console.log("handleClick");
    toggleMenu();
  }

  function handleMovieSave(movieCard) {
    mainApi
      .saveMovie(movieCard)
      .then(({ movie }) => {
        setSavedMovies((prev) => [movie, ...prev]);

        setMovies((prev) =>
          prev.map((item) =>
            movie.movieId === item.id ? { ...item, _id: movie._id } : item
          )
        );
        setFilteredMovies((prev) =>
          prev.map((item) =>
            movie.movieId === item.id ? { ...item, _id: movie._id } : item
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDelete(movie) {
    const movieId = movie._id;
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((savedMovies) => {
          return savedMovies.filter((savedMovie) => savedMovie._id !== movieId);
        });
        const newMovies = movies.map((item) => {
          if (movieId === item._id) {
            delete item._id;
            return { ...item };
          }
          return item;
        });
        setMovies(newMovies);
        setFilteredMovies((prev) =>
          prev.map((item) => {
            if (movieId === item._id) {
              delete item._id;
              return { ...item };
            }
            return item;
          })
        );
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  }

  function logOut() {
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setMovies([]);
    setFilteredSavedMovies([]);
    setFilteredMovies([]);
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div>
      <CurrentUserContext.Provider
        value={{ currentUser, savedMovies, movies, isError }}
      >
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLoading={isLoading}
                menuActive={menuActive}
                handleClick={handleClick}
                toggleMenu={toggleMenu}
                isLoggedIn={isLoggedIn}
                movies={filteredMovies}
                element={MoviesPage}
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
                isLoading={isLoading}
                handleClick={handleClick}
                menuActive={menuActive}
                toggleMenu={toggleMenu}
                isLoggedIn={isLoggedIn}
                element={SavedMoviesPage}
                filterMovies={filterMovies}
                savedMovies={filteredSavedMovies}
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
