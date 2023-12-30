import React, { useRef } from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import RoomCard from "../roomCard/RoomCard.js";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import nodata from "../../assets/images/nodata.jpg";
import UseApi from "../../hookes/useApi.js";

function SelectedRooms({ idHotel }) {
  const location = useLocation();
  const { apiCall, loading, error } = UseApi();
  const [roomData, setRoomData] = useState([]);
  const select = location.state && location.state.select;
  // const [DefaultData, setDefaultData] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiCall({
          url: "/room/search",
          method: "post",
          data: { select },
        });
        setRoomData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, [select]);
  console.log(roomData);

  //creating sorting ref
  // const defaultSorting = useRef();
  // const priceSorting = useRef();
  // const rateSorting = useRef();

  // const sorting = (reference) => {
  //   if (reference.current.textContent === "Default")
  //     setDefaultData(!DefaultData);
  //   else if (reference.current.textContent === "Price")
  //   setRoomData(roomData.sort((a, b) => a.price - b.price));
  //   else if (reference.current.textContent === "Rate")
  //   setRoomData(roomData.sort((a, b) => a.Hotel.rate - b.Hotel.rate));
  // };
  return (
    <>
      <div className={roomsModule.wrapper}>
        <h1 className={roomsModule.header}>Selected Rooms Section</h1>
        <p className={roomsModule.subHeader}>
          rooms result depends on your search specification
        </p>
        {!loading && roomData.length>0 ? (
          <div className={roomsModule.gridView}>
            {roomData.map((room, index) => (
              <RoomCard
                roomId={room.id}
                image={room.RoomImages[0]}
                quality={room.quality}
                hotel={room.hotel}
                price={room.price}
                key={index}
              />
            ))}
          </div>
        ) : !loading && roomData.length === 0 ? (
          <span className={roomsModule.loading}>
          <img
            src={nodata}
            style={{
              width: "15rem",
              height: "15rem",
            }}
            alt="loading"
          />
        </span>
        ) : (
          <span className={roomsModule.loading}>
            <img
              src={loadingImg}
              style={{
                width: "15rem",
                height: "15rem",
              }}
              alt="loading"
            />
          </span>
        )}
      </div>
    </>
  );
}

export default SelectedRooms;
