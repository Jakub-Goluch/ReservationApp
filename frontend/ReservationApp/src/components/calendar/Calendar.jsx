import React, { useState, useEffect, useCallback } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "./CalendarStyles.css";
import dayjs from "dayjs";
import axios from "axios";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [reservedDates, setReservedDates] = useState([]);
  const [selectedNumOfPeople, setSelectedNumOfPeople] = useState(1);

  const fetchReservationData = useCallback(async (date, numPeople) => {
    if (isNaN(numPeople)) {
      console.error("Invalid number of people");
      return [];
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/reservation/${date}/?num_of_ppl=${numPeople}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        console.error("Error fetching reservation data:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching reservation data:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const currentMonth = currentDate.format("MM");
    const daysInMonth = currentDate.daysInMonth();
    const disabledDays = [];

    const fetchDataForDay = async (day) => {
      const dateStr = day.format("DD.MM.YYYY");
      const data = await fetchReservationData(dateStr, selectedNumOfPeople);
      if (data.length === 0) {
        disabledDays.push(day.toDate());
      }
    };

    const fetchReservationDataForMonth = async () => {
      const firstDayOfMonth = dayjs(`${currentMonth}-01`, "MM-DD");
      const promises = Array.from({ length: daysInMonth }, (_, index) => {
        const currentDay = firstDayOfMonth.add(index, "days");
        return fetchDataForDay(currentDay);
      });

      Promise.all(promises).then(() => {
        setReservedDates(disabledDays);
      });
    };

    fetchReservationDataForMonth();
  }, [currentDate, selectedNumOfPeople, fetchReservationData]);

  const handleReservation = async () => {
    const formattedDate = currentDate.format("DD.MM.YYYY");

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/reservation/${formattedDate}/?num_of_ppl=${selectedNumOfPeople}`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Reservation successful:", response.data);
      } else {
        console.error("Error making reservation:", response.status);
      }
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  function disableDates(date) {
    return reservedDates.some((disabledDate) =>
      date.isSame(disabledDate, "day")
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-section">
        <h2 id="pick-nr-header">Pick a number of people for reservation:</h2>
        <input
          type="number"
          min={1}
          max={8}
          value={selectedNumOfPeople}
          onChange={(e) => setSelectedNumOfPeople(Number(e.target.value))}
        />
      </div>
      <div className="calendar-section">
        <h2>Pick a date for reservation:</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            value={currentDate}
            minDate={dayjs()}
            shouldDisableDate={disableDates}
            onChange={(newDate) => setCurrentDate(newDate)}
          />
        </LocalizationProvider>
      </div>
      <button className="reservation-btn" onClick={handleReservation}>
        Reserve
      </button>
    </div>
  );
};

export default Calendar;
