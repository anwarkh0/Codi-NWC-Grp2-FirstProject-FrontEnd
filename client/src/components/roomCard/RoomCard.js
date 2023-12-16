import { React, useState } from "react";
import roomCardModule from "./roomCard.module.css";
import Booking from "../Booking/BookingDetails.js";

function RoomCard({ image, address, hotel, price, stars }) {
  const rating = (stars) => {
    let string = "";
    const sym1 = "★";
    const sym2 = "☆";
    for (let i = 0; i < Math.floor(stars); i++) {
      string += sym1;
    }

    for (let i = 0; i < 5 - Math.floor(stars); i++) {
      string += sym2;
    }

    return string;
  };
  const rate = rating(stars);

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  if (open) {
    document.body.classList.add("visible");
  } else {
    document.body.classList.remove("visible");
  }

  return (
    <div className={roomCardModule.alignModal}>
      <div className={roomCardModule.wrapper}>
        <img
          alt="room"
          className={roomCardModule.roompic}
          src={`http://localhost:8000/${image}`}
        />

        <p className={roomCardModule.address}>
          {address}
          <span className={roomCardModule.reservebtn}>
            <button onClick={toggleOpen} className={roomCardModule.viewMore}>
              view more 
            </button>
          </span>
        </p>
        <h3 className={roomCardModule.hotelName}>{hotel}</h3>
        <p className={roomCardModule.priceAndRate}>
          {price} $ per night<span className={roomCardModule.rate}>{rate}</span>
        </p>
      </div>
      {open && (
        <div className={roomCardModule.modal}>
          <Booking close={toggleOpen} />
        </div>
      )}
    </div>
  );
}

export default RoomCard;
