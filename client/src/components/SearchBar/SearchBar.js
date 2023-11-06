import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBarStyle from "../SearchBar/SearchBar.module.css";
import calendar from "../../assets/images/calendar.png";
import person from "../../assets/images/person.png";
import position from "../../assets/images/position.png";
import search from "../../assets/images/search.png";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import SelectPerson from "../Guests/SelectPerson";

function SearchBar() {
  const [isClicked, setIsClicked] = useState(false);
  const [guestsParent, setGuestsParent] = useState(1);
  const [roomsParent, setRoomsParent] = useState(1);
  const [isDoneParent, setIsDoneParent] = useState(false);

  const selectPeople = () => {
    setIsClicked(!isClicked);
    setIsDoneParent(true);
  };

  let date1 = useRef(null);
  let date2 = useRef(null);

  const CreateCalendar = (date) => {
    useEffect(() => {
      flatpickr(date.current, {
        allowInput: true,
        altFormat: "F j, Y",
        dateFormat: "d M Y",
        defaultDate: new Date(),
        clickOpens: true,
      });
    }, []);
  };
  CreateCalendar(date1);
  CreateCalendar(date2);

  return (
    <section className={`${SearchBarStyle.container}`}>
      <section className={SearchBarStyle.section}>
        <img src={position} className={SearchBarStyle.icons} alt="position" />
        <label className={SearchBarStyle.text}>Location</label>
        <select
          id="position"
          name="position"
          className={`${SearchBarStyle.Description} ${SearchBarStyle.Drop}`}
        >
          <option value="Beirut">Beirut</option>
          <option value="Tripoli">Tripoli</option>
          <option value="Jbail">Jbail</option>
          <option value="Saida">Saida</option>
        </select>
      </section>

      <section className={SearchBarStyle.section}>
        <img src={calendar} className={SearchBarStyle.icons} alt="calendar" />
        <p className={SearchBarStyle.text}>Check in</p>
        <input
          ref={date1}
          className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`}
        />
      </section>

      <section className={`${SearchBarStyle.section}`}>
        <img src={calendar} className={SearchBarStyle.icons} alt="calendar" />
        <p className={SearchBarStyle.text}>Check out</p>
        <input
          ref={date2}
          className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`}
        />
      </section>

      <section className={`${SearchBarStyle.section}`}>
        <img
          src={person}
          className={SearchBarStyle.icons}
          alt="person"
          onClick={selectPeople}
        />
        <p className={SearchBarStyle.text}>Rooms for</p>
        <span className={SearchBarStyle.Description} onClick={selectPeople}>
          {roomsParent} room, {guestsParent}guest{" "}
        </span>
        {isClicked && isDoneParent ? (
          <SelectPerson
            setGuestsParent={setGuestsParent}
            setRoomsParent={setRoomsParent}
            setIsDoneParent={setIsDoneParent}
            setIsCliked={setIsClicked}
            roomsParent={roomsParent}
            guestsParent={guestsParent}
          />
        ) : (
          ""
        )}
      </section>

      <Link to="/room" className={`${SearchBarStyle.section}`}>
        <img src={search} className={SearchBarStyle.icon} alt="search" />
        Search
      </Link>
    </section>
  );
}

export default SearchBar;
