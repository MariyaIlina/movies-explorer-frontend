import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Burger from "../Burger/Burger";

function App() {
  const [menuActive, setMenuActive] = useState(false);

  function toggleMenu() {
    setMenuActive(!menuActive);
  }
  function handleClick() {
    toggleMenu();
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <>
              <Header onOpen={handleClick} />
              <Movies />
              <Footer />
              <Burger isOpen={menuActive} onClose={toggleMenu} />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header onOpen={handleClick} />
              <SavedMovies />
              <Footer />
              <Burger isOpen={menuActive} onClose={toggleMenu} />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header onOpen={handleClick} />
              <Profile />
              <Burger isOpen={menuActive} onClose={toggleMenu} />
            </>
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <div className="App"></div>
    </div>
  );
}

export default App;
