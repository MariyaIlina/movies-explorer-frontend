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
  // const currentUser = useContext(CurrentUserContext);
  const [currentUser, setCurrentUser] = useState({});
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]); //все фильмы
  const [isError, setIsError] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]); //фильмы найденные по поиску
  const [shortMovies, setShortMovies] = useState([]); //короткометражные фильмы
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const navigate = useNavigate();
  const [issaved, setIsSaved] = useState(false);

  // const pathLocation = useLocation.pathname;
  // useEffect(() => {
  //   const currentToken = localStorage.getItem("token");
  //   if (isLoggedIn && currentToken) {
  //     Promise.all([
  //      mainApi.getUserInfo(currentToken),
  //       // mainApi.getSavedMovies(currentToken),
  //     ])
  //       .then(([resUser, resSavedMovies]) => {
  //         setCurrentUser(resUser);
  //         // setSavedMovies(resSavedMovies.reverse());
  //       })
  //       .catch(() => {
  //         console.log(`Ошибка при загрузке данных пользователя и карточек.`);
  //       });
  //   }
  // }, [isLoggedIn]);
  // function checkToken() {
  //   const currentToken = localStorage.getItem("token");
  //   if (currentToken) {
  //     MainApi
  //       .get(currentToken)
  //       .then((res) => {
  //         if (res) {
  //           setIsLoggedIn(true);
  //           navigate();
  //         }
  //       })
  //       .catch(() => {
  //         console.log(`Ошибка при проверке токена`);
  //       });
  //   }
  // }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      auth
        .checkToken(token)
        .then((user) => {
          setCurrentUser(user.user);
          getMovies(token);
        })
        .catch((err) => {
          setIsError(true);

          console.log(err);
        });
    }
  }, [isLoggedIn, navigate]);

  function register({ name, email, password }) {
    auth
      .register(name, email, password)
      .then((data) => {
        setIsLoggedIn(true);
        if (data) {
          login({ name, email, password });
          console.log(data);
        }
        // localStorage.setItem("token", data.token);
        // navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setIsError(true);
      });
  }

  function login({ email, password }) {
    auth
      .login(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка при входе в систему`);
      });
  }

  function handleUpdateUser(data) {
    mainApi
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных.`);
        return [];
      })
      .finally(() => {});
  }

  function filterMovies(query) {
    const lowerCaseQuery = query.toLowerCase();
    if (movies.length) {
      const filteredMoviesArr = movies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(lowerCaseQuery) ||
          movie.nameEN.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredMovies(filteredMoviesArr);
    }
  }

  function moviesDuration(value) {
    // setShortMovies(value);
    if (value) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration < 40);
      setShortMovies(shortMovies);
    }
    console.log("shortMovies=>", shortMovies);
    console.log("filteredMovies=>", filteredMovies);
  }

  function getMovies(token) {
    moviesApi
      .getMovies(token)
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
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
    const isMovieSaved = savedMovies.some(
      (movie) => movie._id === movieCard._id
    );

    if (!isMovieSaved) {
      setIsSaved(true);
    }
    mainApi.saveMovie(movieCard)
    .then((savedMovie) => {
      setSavedMovies([savedMovie, ...savedMovies]);
      console.log(`Карточка сохранена.`);
    }).catch((err) => {
    console.log(err);
  });
  }
  

  function handleMovieDelete(movie) {
    const movieId = movie._id;
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const updatedMovies = movies.filter((m) => m._id !== movieId);
        setMovies(updatedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function logOut() {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
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
                element={MoviesPage}
                filterMovies={filterMovies}
                moviesDuration={moviesDuration}
                handleMovieSave={handleMovieSave}
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
                movies={filteredMovies}
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

              // <ProtectedRoute
              //   element={ProfilePage}
              //   handleClick={handleClick}
              //   menuActive={menuActive}
              //   toggleMenu={toggleMenu}
              //   isLoggedIn={isLoggedIn}
              // />
            }
          />

          <Route path="/signup" element={<Register register={register} />} />
          <Route path="/signin" element={<Login login={login} />} />
          <Route
            path="/*"
            element={
              <MainPage isLoggedIn={isLoggedIn} handleClick={handleClick} />
            }
          />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
