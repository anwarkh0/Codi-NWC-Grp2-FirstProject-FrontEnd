import React from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../roomCard/RoomCard.js";

function Rooms({ idHotel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!idHotel) {
          console.log(idHotel)
          const response = await axios.get("http://localhost:8000/room");
          setData(response.data.dataRooms);
        }
        else {
          const response = await axios.get(`http://localhost:8000/room/byHotel/${idHotel}`);
          setData(response.data.data.rooms);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [idHotel]);

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
              <img src={arr} className={roomsModule.downarr} alt='downarrow' />
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
          {data.map((room, index) => {
            return (
              <RoomCard
                key={index}
                image={room.image}
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
