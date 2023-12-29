import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBarStyle from "../SearchBar/SearchBar.module.css";
import calendar from "../../assets/images/calendar.png";
import person from "../../assets/images/person.png";
import position from "../../assets/images/position.png";
import star from "../../assets/images/star.svg";
import priceIcon from "../../assets/images/price.svg";
import search from "../../assets/images/search.png";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import SelectPerson from "../Guests/SelectPerson";

function SearchBar() {
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    city: "Beirut",
    guestNumber: 1,
    price: 100,
    quality: "High",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]:
        name === "guestNumber" || name === "price"
          ? parseInt(value, 10)
          : value,
    });
  };
  // const selectPeople = () => {
  //   setIsClicked(!isClicked);
  //   setIsDoneParent(true);
  // };

  // let date1 = useRef(null);
  // let date2 = useRef(null);

  // const CreateCalendar = (date) => {
  //   useEffect(() => {
  //     flatpickr(date.current, {
  //       allowInput: true,
  //       altFormat: "F j, Y",
  //       dateFormat: "d M Y",
  //       defaultDate: new Date(),
  //       clickOpens: true,
  //     });
  //   }, []);
  // };
  // CreateCalendar(date1);
  // CreateCalendar(date2);

  return (
    <section className={`${SearchBarStyle.container}`}>
      <section className={SearchBarStyle.section}>
        <img src={position} className={SearchBarStyle.icons} alt="position" />
        <label className={SearchBarStyle.text}>Location</label>
        <select
        onChange={handleInputChange}
          id="city"
          name="city"
          className={`${SearchBarStyle.Description} ${SearchBarStyle.Drop}`}
        >
          <option value="Beirut">Beirut</option>
          <option value="Tripoli">Tripoli</option>
          <option value="Jbail">Jbail</option>
          <option value="Saida">Saida</option>
        </select>
      </section>

      <section className={SearchBarStyle.section}>
        {/* <img src={calendar} className={SearchBarStyle.icons} alt="calendar" />
        <p className={SearchBarStyle.text}>Check in</p>
        <input
          ref={date1}
          className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`}
        /> */}

        <img src={person} className={SearchBarStyle.icons} alt="person" />
        <label className={SearchBarStyle.text}>Guests Number</label>
        <select
        onChange={handleInputChange}
          id="guestNumber"
          name="guestNumber"
          className={`${SearchBarStyle.Description} ${SearchBarStyle.Drop}`}
        >
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
          <option value="5">More than 4 guests</option>
        </select>
      </section>

      <section className={`${SearchBarStyle.section}`}>
        {/* <img src={calendar} className={SearchBarStyle.icons} alt="calendar" />
        <p className={SearchBarStyle.text}>Check out</p>
        <input
          ref={date2}
          className={`${SearchBarStyle.Description} ${SearchBarStyle.calendar}`}
        /> */}
        <img
          src={priceIcon}
          className={SearchBarStyle.svgIcon}
          alt="price"
        />
        <label className={SearchBarStyle.text}>Price Per Night</label>
        <select
        onChange={handleInputChange}
          id="price"
          name="price"
          className={`${SearchBarStyle.Description} ${SearchBarStyle.Drop}`}
        >
          <option value="100">$100 and less</option>
          <option value="200">$100 - $200</option>
          <option value="300">$200 - $300</option>
          <option value="400">$300 - $400</option>
          <option value="500">More than $400</option>
        </select>
      </section>

      <section className={`${SearchBarStyle.section}`}>
        <img src={star} className={SearchBarStyle.svgIcon} alt="position" />
        <label className={SearchBarStyle.text}>Quality</label>
        <select
        onChange={handleInputChange}
          id="quality"
          name="quality"
          className={`${SearchBarStyle.Description} ${SearchBarStyle.Drop}`}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {/* <img
          src={person}
          className={SearchBarStyle.icons}
          alt="person"
          onClick={selectPeople}
        />
        <p className={SearchBarStyle.text}>Rooms for</p>
        <span className={SearchBarStyle.Description} onClick={selectPeople}>
          {roomsParent} room, {guestsParent}guest{" "}
        </span> */}
        {/* {isClicked && isDoneParent ? (
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
        )} */}
      </section>

      <Link to="/selectedrooms" className={`${SearchBarStyle.section}`} state={{ select: formData }}>
        <img src={search} className={SearchBarStyle.icon} alt="search" />
        Search
      </Link>
    </section>
  );
}

export default SearchBar;
