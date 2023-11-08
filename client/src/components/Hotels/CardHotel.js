import React from "react";
import { Link} from "react-router-dom";
import cardHotelStyle from "../../components/Hotels/CardHotel.module.css";


const CardHotel = ({ data: { _id,name, city, image, rate } }) => {
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
    //create condition according to the id given here if it's exit fetch new data 
    //fetching Data for rooms onClick
    <Link to={`/room/${_id}`} className={cardHotelStyle.hotelCard} >
      <img
        src={`http://localhost:8000/${image}`}
        alt={`${name} hotel`}
        className={cardHotelStyle.image}
      />
      <div className={cardHotelStyle.details}>
        <p className={cardHotelStyle.address}>{city}</p>
        <h2 className={cardHotelStyle.hotelName}>{name}</h2>
        <div className={cardHotelStyle.Rating}>{Rate}</div>
      </div>
    </Link>
  );
};

export default CardHotel;
