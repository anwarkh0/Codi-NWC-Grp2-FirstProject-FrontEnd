import React from "react";
import CardHotel from "./CardHotel";
import hotel1 from "../../assets/images/hotel2.png";
import hotelsStyle from "./Hotels.module.css";
const Hotels = () => {
  const hotelData = [
    {
      Name: "Movempick",
      imageSrc: hotel1,
      Address: "Beirut Raoucheh",
      rate: 3.8,
    },
    {
      Name: "Movempick",
      imageSrc: hotel1,
      Address: "Beirut Raoucheh",
      rate: 5,
    },
    {
      Name: "Movempick",
      imageSrc: hotel1,
      Address: "Beirut Raoucheh",
      rate: 4,
    },
    {
      Name: "Movempick",
      imageSrc: hotel1,
      Address: "Beirut Raoucheh",
      rate: 3,
    },
    {
      Name: "Movempick",
      imageSrc: hotel1,
      Address: "Beirut Raoucheh",
      rate: 4,
    },
  ];

  const hotels = hotelData.map((hotel) => <CardHotel data={hotel} />);
  return (
    <div className={hotelsStyle.container}>
      <h1>Popular Hotels</h1>
      <p className={hotelsStyle.slogan}>
        Discover the epitome of luxury. Here are our hotels.
      </p>
      <div className={hotelsStyle.Hotels}>{hotels}</div>
    </div>
  );
};

export default Hotels;
