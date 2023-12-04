import React, { useState, useEffect } from "react";
import "./Reservations.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";

const Reservations = ({ clientId }) => {
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(() => {
    const fetchClientReservations = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/client/?client_id=${clientId}`
        );

        if (response.status === 200) {
          const clientData = response.data;
          const reservations = clientData.reservations || [];
          setReservationsData(reservations);
        } else {
          console.error("Error fetching client reservations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching client reservations:", error);
      }
    };

    fetchClientReservations();
  }, [clientId]);

  return (
    <div className="main-container">
      <h2 id="reservations-header">My reservations:</h2>
      <div className="reservation-container">
        {reservationsData.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <div className="people-nr-div">
              <PeopleAltIcon />
              <span>{reservation.num_of_ppl}</span>
            </div>
            <div className="date-div">
              <CalendarMonthIcon />
              <span>{reservation.day}</span>
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
