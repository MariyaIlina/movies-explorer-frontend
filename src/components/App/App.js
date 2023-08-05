import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      Promise.all([getSavedMovies(token), getMovies()])
        .then(([saved, movies]) => {
          localStorage.setItem( `Movies`, JSON.stringify(movies));
          
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
        `savedMovies`,
        JSON.stringify(savedMovies)
      );
      setFilteredSavedMovies(savedMovies);
    }
  }, [currentUser, savedMovies]);

  useEffect(() => {
    if( location.pathname === '/saved-movies'){
      setFilteredSavedMovies(savedMovies);
    }
  }, [location])
  
  const getMovies = () => {
    const storageMovies = localStorage.getItem( `Movies`);
    if (storageMovies && JSON.parse(storageMovies).length > 0) {
      return Promise.resolve(JSON.parse(storageMovies));
    } else {
      return moviesApi.getMovies();
    }
  }

  function getSavedMovies(token) {
    const storageSavedMovies = localStorage.getItem( `savedMovies`);
    if (storageSavedMovies && JSON.parse(storageSavedMovies).length > 0) {
      return Promise.resolve(JSON.parse(storageSavedMovies));
    } else {
      return mainApi.getSavedMovies(token);
    }
  }
  function checkToken(token) {
    const pathname = location.pathname;
    mainApi
      .checkToken(token)
      .then(({ user }) => {
        setIsLoggedIn(true);
        setCurrentUser(user);

        if(pathname === "/signup" ||  pathname === "/signin"){
          navigate("/movies", { replace: true });
        } else {
          navigate(pathname, { replace: true });
        }
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
        login({ email, password });
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
    localStorage.clear(); // удаляем все localStorage

    // Первый вариант удаления состояний
    // window.location.replace(window.location.origin); // Переходим на начальную страницу обнуляя все useState
    // Или 
    setIsLoggedIn(false); // обнуляю состояние  'Пользователь авторизован'
    setMenuActive(false); // обнуляю состояние  'Меню активно'
    setIsLoading(false); // обнуляю состояние  'Идёт загрузка данных'
    setIsError([]) // обнуляю состояние  'Ошибки форм'

    setCurrentUser({}); // обнуляю состояние  'Авторизованный пользователь'

    setMovies([]) // обнуляю состояние  'Все фильмы'
    setFilteredMovies([]) // обнуляю состояние  'Отфильтрованные фильмы'
    setSavedMovies([]) // обнуляю состояние  'Сохранённые фильмы'
    setFilteredSavedMovies([]) // обнуляю состояние  'Сохранённые отфильтрованные фильмы'
    // остальные состояния обнуляются при демонтировании компонентов

    navigate("/"); // переходим на главный экран
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
          <Route
            path="/signup"
            element={
              <ProtectedRoute
                isLoggedIn={!isLoggedIn}
                element={Register}
                register={register}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute
                isLoggedIn={!isLoggedIn}
                element={Login}
                login={login}
              />
            }
          />
          <Route
            index
            element={
              <MainPage
              isLoggedIn={isLoggedIn}
              menuActive={menuActive}
              toggleMenu={toggleMenu}
              handleClick={handleClick}
              />
            }
            />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
