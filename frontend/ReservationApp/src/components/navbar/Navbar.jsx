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
        <li>
          <a href="/">
            <TableRestaurantIcon></TableRestaurantIcon>
            <span>Make a reservation</span>
          </a>
        </li>
        <li>
          <a href="/">
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
