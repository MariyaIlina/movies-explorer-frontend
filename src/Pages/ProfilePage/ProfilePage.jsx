import React from "react";
import Burger from "../../components/Burger/Burger";
import Profile from "../../components/Profile/Profile";
import HeaderMain from "../../components/HeaderMain/HeaderMain";

function ProfilePage({
  handleClick, menuActive, toggleMenu, isLoggedIn, logOut, onUpdateUser,
}) {

  return (
    <>
      <HeaderMain handleClick={handleClick} isLoggedIn={isLoggedIn} /> 
      <Profile
        logOut={logOut}
        onUpdateUser={onUpdateUser} />
      <Burger isOpen={menuActive} onClose={toggleMenu} />
    </>
  );
}

export default ProfilePage;
