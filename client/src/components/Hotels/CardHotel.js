import React from "react";
import cardHotelStyle from "../../components/Hotels/CardHotel.module.css";

const CardHotel = ({ data: { Name, Address, imageSrc, rate } }) => {
  const rating = (rate) => {
    let string = "";
    const sym1 = "★";
    const sym2 = "☆";
    for (let i = 0; i < Math.floor(rate); i++) {
      string += sym1;
    }

    for (let i = 0; i < 5 - Math.floor(rate); i++) {
      string += sym2;
    }

    return string;
  };
  const Rate = rating(rate);
  return (
    <div className={cardHotelStyle.hotelCard}>
      <img
        src={imageSrc}
        alt={`${Name} hotel`}
        className={cardHotelStyle.image}
      />
      <div className={cardHotelStyle.details}>
        <p className={cardHotelStyle.address}>{Address}</p>
        <p className={cardHotelStyle.hotelName}>{Name}</p>
        <div className={cardHotelStyle.Rating}>{Rate}</div>
      </div>
    </div>
  );
};

export default CardHotel;
