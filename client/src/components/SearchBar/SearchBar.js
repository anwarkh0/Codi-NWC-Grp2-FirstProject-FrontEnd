import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBarStyle from "../SearchBar/SearchBar.module.css";
import person from "../../assets/images/person.png";
import position from "../../assets/images/position.png";
import star from "../../assets/images/star.svg";
import priceIcon from "../../assets/images/price.svg";
import search from "../../assets/images/search.png";
import "flatpickr/dist/flatpickr.min.css";

function SearchBar() {
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

        <img src={person} className={SearchBarStyle.icons} alt="person" />
        <label className={SearchBarStyle.text}>Guests</label>
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
        <img
          src={priceIcon}
          className={SearchBarStyle.svgIcon}
          alt="price"
        />
        <label className={SearchBarStyle.text}>Price/night</label>
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
      </section>

      <Link to="/selectedrooms" className={`${SearchBarStyle.section}`} state={{ select: formData }}>
        <img src={search} className={SearchBarStyle.icon} alt="search" />
        Search
      </Link>
    </section>
  );
}

export default SearchBar;
