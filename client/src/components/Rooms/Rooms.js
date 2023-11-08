import React, { useRef } from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../roomCard/RoomCard.js";

function Rooms({ idHotel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [DefaultData, setDefaultData]=useState(false)

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
  }, [idHotel,DefaultData]);

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
  const defaultSorting = useRef();
  const priceSorting = useRef();
  const rateSorting = useRef();

  const sorting = (reference) => {

    if (reference.current.textContent === 'Default') setDefaultData(!DefaultData);
    else if (reference.current.textContent === 'Price') setData(data.sort((a, b) => a.price - b.price))
    else if (reference.current.textContent === 'Rate') setData(data.sort((a, b) => a.rate - b.rate))

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
                <a href="#" className={roomsModule.menuItem} ref={defaultSorting} onClick={() => sorting(defaultSorting)}>
                  Default
                </a>
              </li>
              <li className={roomsModule.listItem}>
                <a href="#" className={roomsModule.menuItem} ref={priceSorting} onClick={() => sorting(priceSorting)}>
                  Price
                </a>
              </li>
              <li className={roomsModule.listItem}>
                <a href="#" className={roomsModule.menuItem} ref={rateSorting} onClick={() => sorting(rateSorting)}>
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
