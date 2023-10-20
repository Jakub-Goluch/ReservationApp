import React, { useRef, useState } from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import "./NavbarStyles.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const navRef = useRef();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    if (isNavOpen) {
      navRef.current.classList.remove("responsive");
    } else {
      navRef.current.classList.add("responsive");
    }
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    navRef.current.classList.remove("responsive");
    setIsNavOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeNav();
  };

  return (
    <nav className="nav-items">
      <div className="logo">
        <RestaurantIcon fontSize="large"></RestaurantIcon>
        <span>ReservationApp</span>
      </div>
      <ul
        className={`nav-menu-items ${isNavOpen ? "responsive" : ""}`}
        ref={navRef}
      >
        <li onClick={() => scrollToSection("book-now-btn")}>
          <a>
            <TableRestaurantIcon></TableRestaurantIcon>
            <span>Make a reservation</span>
          </a>
        </li>
        <li onClick={() => scrollToSection("reservations-header")}>
          <a>
            <InfoOutlinedIcon></InfoOutlinedIcon>
            <span>My reservations</span>
          </a>
        </li>
        <li>
          <a href="/">
            <HomeIcon></HomeIcon>
            <span>Home</span>
          </a>
        </li>

        <button>Sign up</button>
      </ul>
      <div className="toggle-nav-btn">
        {isNavOpen ? (
          <CloseIcon onClick={toggleNav} fontSize="large"></CloseIcon>
        ) : (
          <MenuIcon onClick={toggleNav} fontSize="large"></MenuIcon>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
