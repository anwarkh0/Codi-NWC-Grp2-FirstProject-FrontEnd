import React from "react";
import roomCardModule from "./roomCard.module.css";
function RoomCard({ picture, hotel, price, stars }) {
  return (
    <div className={roomCardModule.wrapper}>
      <img className={roomCardModule.roompic} src={picture} />
      <h3 className={roomCardModule.hotelName}>{hotel}</h3>
      <p className={roomCardModule.priceAndRate}>
        {price} $ per night<span>{stars}</span>
      </p>
    </div>
  );
}

export default RoomCard;
