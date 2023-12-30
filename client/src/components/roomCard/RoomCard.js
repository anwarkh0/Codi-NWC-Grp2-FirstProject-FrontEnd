import { React, useContext, useEffect, useState } from "react";
import roomCardModule from "./roomCard.module.css";
import { useNavigate } from "react-router-dom";
import { IconButton, Rating } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";

const RoomCard = ({
  data,
  image,
  quality,
  hotel,
  price,
  roomId,
  setOneRoom
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateHotel = () => {
    navigate(`/hotel/${data.id}`);
  };
  const navigateRoom = () => {
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <div className={roomCardModule.wrapper}>
        <img
          alt="room"
          className={roomCardModule.roompic}
          src={`${process.env.REACT_APP_SQL_API}/${
            data && data.HotelImages
              ? data.HotelImages[0].icon
              : image && image.icon
          }`}
        />
        <div
          style={{
            // paddingRight:"5px",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            className={roomCardModule.reservebtn}
            style={{ marginRight: "10px" }}
          >
            <button
              onClick={data ? navigateHotel : navigateRoom}
              className={roomCardModule.viewMore}
            >
              View more
            </button>
          </span>
          <p
            className={roomCardModule.address}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                fontFamily: "Helvetica Neue",
              }}
            >
              {data ? data.name : quality + " quality"}
            </span>
            <span
              style={{
                color: "black",
                fontFamily: "Helvetica Neue",
              }}
            >
              {data ? data.city : ""}
            </span>
          </p>
        </div>
        <h3 className={roomCardModule.hotelName}>{hotel}</h3>
        <p
          className={roomCardModule.priceAndRate}
          style={{
            paddingRight: 0,
          }}
        >
          {!data ? (
              <span>{price} $ per night</span>
          ) : (
            <span
              className={roomCardModule.rate}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Rating value={data.rating} />
            </span>
          )}
        </p>
      </div>
    </>
  );
};

export default RoomCard;
