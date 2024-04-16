import React, { useState } from "react";
import "./OpeningHoursForm.css";

export default function OpeningHours() {
  const [openingHours, setOpeningHours] = useState({});
  const [saveHours, setSaveHours] = useState(false);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function handleDayChange(evt) {
    const { name, checked } = evt.target;
    setOpeningHours({ ...openingHours, [name]: checked });
  }

  function handleTimeChange(evt) {
    const { name, value } = evt.target;
    setOpeningHours({ ...openingHours, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setOpeningHours({ ...openingHours });
    setSaveHours(true);
    console.log("Opening hours saved:", openingHours);
  }

  function formatTime() {
    const date = new Date();
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function deleteTime(day) {
    const updatedHours = { ...openingHours };
    delete updatedHours[day];
    setOpeningHours(updatedHours);
    setSaveHours(false);
  }

  return (
    <div className="opening-hours">
      <h2>Edit Opening Hours</h2>
      <form onSubmit={handleSubmit} className="days-container">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-selector">
            <label>
              {day.charAt(0) + day.slice(1)}:
              <input
                type="checkbox"
                name={day}
                checked={openingHours[day]}
                onChange={handleDayChange}
              />
            </label>
            {openingHours[day] && (
              <div className="time-inputs">
                <label>
                  Opening Time:
                  <input
                    type="time"
                    name={`${day}Opening`}
                    value={openingHours[`${day}Opening`] || ""}
                    onChange={handleTimeChange}
                  />
                </label>
                <label>
                  Closing Time:
                  <input
                    type="time"
                    name={`${day}Closing`}
                    value={openingHours[`${day}Closing`] || ""}
                    onChange={handleTimeChange}
                  />
                </label>
              </div>
            )}
          </div>
        ))}
        {saveHours && (
          <div>
            <h2>Opening Hours</h2>
            <ul>
              {daysOfWeek.map(
                (day) =>
                  // check for times & format
                  openingHours[`${day}Opening`] &&
                  openingHours[`${day}Closing`] && (
                    <li key={day}>
                      {day.charAt(0) + day.slice(1)}:{" "}
                      {formatTime(openingHours[`${day}Opening`])} -{" "}
                      {formatTime(openingHours[`${day}Closing`])}
                      <button onClick={() => deleteTime(day)}>Delete</button>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
        <div className="button-container">
          <button type="submit">Save Opening Hours</button>
        </div>
      </form>
    </div>
  );
}
