import React from "react";
import roomCardModule from "./roomCard.module.css";
function RoomCard({ picture, address, hotel, price, stars }) {
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
  return (
    <div className={roomCardModule.wrapper}>
      <img alt="room" className={roomCardModule.roompic} src={picture} />

      <p className={roomCardModule.address}>
        {address}
        <span className={roomCardModule.reservebtn}>
          <button className={roomCardModule.reserve}>Reserve</button>
        </span>
      </p>
      <h3 className={roomCardModule.hotelName}>{hotel}</h3>
      <p className={roomCardModule.priceAndRate}>
        {price} $ per night<span className={roomCardModule.rate}>{rate}</span>
      </p>
    </div>
  );
}

export default RoomCard;
