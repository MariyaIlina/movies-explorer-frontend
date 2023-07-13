import React, { useEffect } from "react";
import Burger from "../../components/Burger/Burger";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import HeaderMain from "../../components/HeaderMain/HeaderMain";

function ProfilePage({
  handleClick, menuActive, toggleMenu, isLoggedIn, logOut, onUpdateUser,
}) {
  const navigate = useNavigate();

  return (
    <>
      <HeaderMain onOpen={handleClick} isLoggedIn={isLoggedIn} />
      <Profile
        logOut={logOut}
        onUpdateUser={onUpdateUser} />
      <Burger isOpen={menuActive} onClose={toggleMenu} />
    </>
  );
}

export default ProfilePage;
