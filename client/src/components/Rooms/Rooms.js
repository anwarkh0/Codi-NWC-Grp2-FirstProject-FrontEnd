import React, { useRef } from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../roomCard/RoomCard.js";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import UseApi from "../../hookes/useApi.js";
function Rooms({ idHotel }) {
  const {apiCall,loading,error}=UseApi()
  const [type, setType] = useState('default');
  const [roomData, setRoomData] = useState(null);
  // const [DefaultData, setDefaultData] = useState(false);

  useEffect(()=>{
    console.log(type)
    const fetchRooms =async () =>{
      try {
        const response = await apiCall({ url: "/room/order", method: "post" ,data:{type} })
        setRoomData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchRooms()
},[type])
  const [active, setActive] = useState(false);
  const clickHandler = () => {
    setActive(!active);
  };

  let ink = roomsModule.open;
  let arr = down;
  if (active) {
    ink = roomsModule.open;
    arr = up;
  } else {
    ink = roomsModule.closed;
    arr = down;
  }

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
        <h1 className={roomsModule.header}>All Rooms Section</h1>
        <p className={roomsModule.subHeader}>Enjoy our luxurious getaways</p>
        <div className={roomsModule.filter} onClick={clickHandler}>
          <div className={roomsModule.upper}>
            <p className={roomsModule.sort}>Sort by</p>
            <span className={roomsModule.downarrow}>
              <img src={arr} className={roomsModule.downarr} alt="downarrow" />
            </span>
          </div>
          <div className={ink}>
            <ul className={roomsModule.list}>
              <li className={roomsModule.listItem}>
                <span
                  className={roomsModule.menuItem}
                  onClick={() => setType("quality")}
                >
                  Quality
                </span>
              </li>
              <li className={roomsModule.listItem}>
                <span
                  className={roomsModule.menuItem}
                  onClick={() => setType('price')}
                >
                  Price
                </span>
              </li>
              <li className={roomsModule.listItem}>
                <span
                  className={roomsModule.menuItem}
                  onClick={() => setType("guestNumber")}
                >
                  Guets
                </span>
              </li>
            </ul>
          </div>
        </div>

          {!loading && roomData ? (
            <div className={roomsModule.gridView}>
            {roomData.map((room, index) => {
              return (
                <RoomCard
                  roomId={room.id}
                  image={room.RoomImages[0]}
                  quality={room.quality}
                  hotel={room.hotel}
                  price={room.price}
                  key={index}
                />
                );
              })}
              </div>
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

export default Rooms;
