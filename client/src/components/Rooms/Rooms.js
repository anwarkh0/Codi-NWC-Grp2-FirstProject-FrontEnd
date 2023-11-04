import React from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { useState } from "react";
import room1 from "../../assets/images/rooms/room1.png";
import room2 from "../../assets/images/rooms/room2.png";
import room3 from "../../assets/images/rooms/rom3.png";
import RoomCard from "../roomCard/RoomCard.js";
function Rooms() {
  //////////////////////
  let roomsArr = [
    {
      picture: room1,
      hotel: "kingsHotel",
      address: "lebanon",
      price: 200,
      stars: 5,
    },
    {
      picture: room2,
      hotel: "NightWatch",
      address: "lebanon",
      price: 100,
      stars: 3,
    },
    {
      picture: room3,
      hotel: "noManLand",
      address: "lebanon",
      price: 999,
      stars: 4,
    },
    {
      picture: room1,
      hotel: "kingsHotel",
      address: "lebanon",
      price: 200,
      stars: 5,
    },
    {
      picture: room2,
      hotel: "NightWatch",
      address: "lebanon",
      price: 100,
      stars: 3,
    },
    {
      picture: room3,
      hotel: "noManLand",
      address: "lebanon",
      price: 999,
      stars: 4,
    },
  ];
  /////////////////////
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
  return (
    <>
      <div className={roomsModule.wrapper}>
        <div className={roomsModule.filter} onClick={clickHandler}>
          <div className={roomsModule.upper}>
            <p className={roomsModule.sort}>Sort by</p>
            <span className={roomsModule.downarrow}>
              <img src={arr} className={roomsModule.downarr} />
            </span>
          </div>
          <div className={ink}>
            <ul className={roomsModule.list}>
              <li className={roomsModule.listItem}>
                <a href="#" className={roomsModule.menuItem}>
                  Price
                </a>
              </li>
              <li className={roomsModule.listItem}>
                <a href="#" className={roomsModule.menuItem}>
                  Rate
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={roomsModule.gridView}>
          {roomsArr.map((room, index) => {
            return (
              <RoomCard
                key={index}
                picture={room.picture}
                address={room.address}
                hotel={room.hotel}
                price={room.price}
                stars={room.stars}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Rooms;
