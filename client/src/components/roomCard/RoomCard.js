import { React, useState } from "react";
import roomCardModule from "./roomCard.module.css";
import Booking from "../Booking/BookingDetails.js";
import { useNavigate } from "react-router-dom";

function RoomCard({ data, image, address, hotel, price, stars }) {
  const rating = (stars) => {
    let string = "";
    const sym1 = "★"
    const sym2 = "☆";
    for (let i = 0; i < Math.floor(stars); i++) {
      string += sym1;
    }

    for (let i = 0; i < 5 - Math.floor(stars); i++) {
      string += sym2;
    }

    return string;
  };
  const navigate = useNavigate()
  const rate = rating(data ? data.rate : stars);
  const navigateHotel = () => {
    navigate('/hotel:id')
  }

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
    < >
      <div className={roomCardModule.wrapper}>
        <img
          alt="room"
          className={roomCardModule.roompic}
          src={`http://localhost:8000/${data ? data.image : image}`}
        />
        <div style={
          {
            // paddingRight:"5px",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }
        }>

          <span className={roomCardModule.reservebtn} style={{ marginRight: "10px" }}>
            <button onClick={data ? navigateHotel : toggleOpen} className={roomCardModule.viewMore}>
              view more
            </button>
          </span>
          <p className={roomCardModule.address} style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '0.5rem'
          }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {data ? data.name : address}
            </span>
            <span style={{
              color: 'black'
            }}>
              {data ? data.city : ''}
            </span>

          </p>
        </div>
        <h3 className={roomCardModule.hotelName}>{hotel}</h3>
        <p className={roomCardModule.priceAndRate}>
          {data ? '' : (
            <span>
              {price} $ per night
            </span>
          )}
          <span className={roomCardModule.rate}>{rate}</span>
        </p>
      </div>
      {open && (
        <div className={roomCardModule.modal}>
          <Booking close={toggleOpen} />
        </div>
      )}
    </>
  );
}

export default RoomCard;
