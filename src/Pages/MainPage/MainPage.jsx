import React from "react";
import Footer from "../../components/Footer/Footer";
import Promo from "../../components/Promo/Promo";
import AboutMe from "../../components/AboutMe/AboutMe";
import AboutProject from "../../components/AboutProject/AboutProject";
import Techs from "../../components/Techs/Techs";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import Burger from "../../components/Burger/Burger";

const MainPage = ({isLoggedIn, menuActive, toggleMenu,handleClick}) => {
  return (
    <main>
      <HeaderMain isLoggedIn={ isLoggedIn } handleClick={handleClick}/>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
      <Burger isOpen={menuActive} onClose={toggleMenu} />
    </main>
  );
};

export default MainPage;
