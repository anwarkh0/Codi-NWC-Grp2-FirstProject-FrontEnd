import React from "react";
import { Link } from "react-router-dom";
import cardHotelStyle from "../../components/Hotels/CardHotel.module.css";

const CardHotel = ({ data: { name, address, images, rate } }) => {
  const rating = (rate) => {
    let string = "";
    const sym1 = "★";
    const sym2 = "☆";
    for (let i = 0; i < Math.round(rate); i++) {
      string += sym1;
    }

    for (let i = 0; i < 5 - Math.round(rate); i++) {
      string += sym2;
    }

    return string;
  };
  const Rate = rating(rate);
  return (
    //fetching Data for rooms onClick
    <Link to="/room" className={cardHotelStyle.hotelCard}>
      <img
        src={images[0]}
        alt={`${name} hotel`}
        className={cardHotelStyle.image}
      />
      <div className={cardHotelStyle.details}>
        <p className={cardHotelStyle.address}>{address}</p>
        <p className={cardHotelStyle.hotelName}>{name}</p>
        <div className={cardHotelStyle.Rating}>{Rate}</div>
      </div>
    </Link>
  );
};

export default CardHotel;
