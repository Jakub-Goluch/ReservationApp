import React from "react";
import "./HeroStyles.css";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

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
          <a onClick={() => scrollToSection("book-now-btn")}>
            <span id="book-now-btn">Book Now!</span>
            <KeyboardDoubleArrowDownIcon />
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
