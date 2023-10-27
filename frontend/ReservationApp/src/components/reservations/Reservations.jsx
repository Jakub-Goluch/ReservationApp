import React from "react";
import "./Reservations.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const reservationsData = [
  {
    id: 1,
    people: 3,
    date: "28/02/2023",
  },
  {
    id: 2,
    people: 8,
    date: "15/03/2023",
  },
  {
    id: 3,
    people: 6,
    date: "02/04/2023",
  },
];

const Reservations = () => {
  return (
    <div className="main-container">
      <h2 id="reservations-header">My reservations:</h2>
      <div className="reservation-container">
        {reservationsData.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <div className="people-nr-div">
              <PeopleAltIcon />
              <span>{reservation.people}</span>
            </div>
            <div className="date-div">
              <CalendarMonthIcon />
              <span>{reservation.date}</span>
            </div>
            <div className="control-btn-div">
              <HighlightOffIcon />
              <span>cancel reservation</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
