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
import MainApi from "../../utils/MainApi";
import Auth from "../../utils/auth";
import SavedMoviesPage from "../../Pages/SavedMoviesPage/SavedMoviesPage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";

function App() {
  const auth = new Auth();
  const [currentUser, setCurrentUser] = useState({});
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]); //все фильмы
  const [isError, setIsError] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]); //фильмы найденные по поиску
  const [shortMovies, setShortMovies] = useState(false); 
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const moviesApi = new MoviesApi();
  const mainApi = new MainApi();
const location = useLocation();

// useEffect(() => {
//   if (isLoggedIn) {
//     Promise.all([mainApi.getUserInfo(),
//       //  mainApi.getSavedMovies()
//       ])
//       .then(([data]) => {
//         setCurrentUser(data.user);console.log(data)
//         // setSavedMovies(card);
//       })
//       .catch((err) => console.log("err=>", err));
//   }
// }, [isLoggedIn]);

// const cbTokenCheck = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     auth
//       .checkToken(token)
//       .then((res) => {
//         if (res) {
//           setIsLoggedIn(true);
        
//           navigate("/");
//         }
//       })
//       .catch((err) => console.log(err));
//   }
// };

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     cbTokenCheck(location.pathname);
//   }
// }, [location.pathname]);


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

  function handleUpdateUser(userName, userEmail) {
    const token = localStorage.getItem("token");console.log()
    const name = userName;
    const email = userEmail;
    mainApi
      .updateUser(name, email, token)
      .then((res) => {
        setCurrentUser(res);
        console.log("");
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных.`);
      })
      .finally(() => {});
  }

  function filterMovies(value) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (movies.length) {
      const filteredMoviesArr = movies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(lowerCaseQuery) ||
          movie.nameEN.toLowerCase().includes(lowerCaseQuery)
      );
       console.log(shortMovies)
    if(value){
      setFilteredMovies(filteredMoviesArr.filter(movie=>movie.duration<40))
    }else{
        setFilteredMovies(filteredMoviesArr);
    }
    }
  }
// function filterShortMovies(){
//   if(shortMovies){

//   }
// }
  function getMovies(token) {
    moviesApi
      .getMovies(token)
      .then((res) => {
        setMovies(res);
        localStorage.setItem('movies', JSON.stringify(res))
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

  function handleMovieSave(movie, token) {
    mainApi.saveMovie(movie, token)
      .then((movie) => {
       console.log(movie)
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDelete(movie) {
    const movieId = movie._id;
    MainApi.deleteMovie(movieId)
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
    // navigate("/");
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
                setShortMovies={setShortMovies}
                handleMovieSave={handleMovieSave}
                setSearchQuery={setSearchQuery}
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
                filterMovies={filterMovies}
            
                setSearchQuery={setSearchQuery}
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
