import React from "react";
import "./HeroStyles.css";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <img
          src=".\src\assets\restaurant-tables-view-1.jpg"
          alt="restaurant tables"
        />
        <div className="main-txt">
          <h1>Find and book table - quickly and easily!</h1>
          <a href="/">
            <span>Book Now!</span>
            <KeyboardDoubleArrowDownIcon />
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
