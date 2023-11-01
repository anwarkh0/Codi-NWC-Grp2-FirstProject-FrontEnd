import React from "react";
import roomCardModule from "../styles/roomCard.module.css";
function RoomCard({ picture, hotel, price, stars }) {
  return (
    <div className={roomCardModule.wrapper}>
      <img src={picture} />
      <h3>{hotel}</h3>
      <p>
        {price} $ per night<span>{stars}</span>
      </p>
    </div>
  );
}

export default RoomCard;
