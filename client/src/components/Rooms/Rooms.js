import React, { useRef } from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../roomCard/RoomCard.js";
import loading from "../../assets/images/hotel-loading-gif.gif";

function Rooms({ idHotel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [DefaultData, setDefaultData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (!idHotel) {
          console.log(idHotel);
          const response = await axios.get(
            `${process.env.REACT_APP_MY_API}/room`
          );
          setData(response.data.dataRooms);
        } else {
          const response = await axios.get(
            `${process.env.REACT_APP_MY_API}/room/byHotel/${idHotel}`
          );
          setData(response.data.data.rooms);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [idHotel, DefaultData]);

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
    if (reference.current.textContent === "Default")
      setDefaultData(!DefaultData);
    else if (reference.current.textContent === "Price")
      setData(data.sort((a, b) => a.price - b.price));
    else if (reference.current.textContent === "Rate")
      setData(data.sort((a, b) => a.Hotel.rate - b.Hotel.rate));
  };
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
                <a
                  href="#"
                  className={roomsModule.menuItem}
                  ref={defaultSorting}
                  onClick={() => sorting(defaultSorting)}
                >
                  Default
                </a>
              </li>
              <li className={roomsModule.listItem}>
                <a
                  href="#"
                  className={roomsModule.menuItem}
                  ref={priceSorting}
                  onClick={() => sorting(priceSorting)}
                >
                  Price
                </a>
              </li>
              <li className={roomsModule.listItem}>
                <a
                  href="#"
                  className={roomsModule.menuItem}
                  ref={rateSorting}
                  onClick={() => sorting(rateSorting)}
                >
                  Rate
                </a>
              </li>
            </ul>
          </div>
        </div>

          {!isLoading && data ? (
            <div className={roomsModule.gridView}>
            {data.map((room, index) => {
              return (
                <RoomCard
                  image={room.image}
                  address={room.address}
                  hotel={room.hotel}
                  price={room.price}
                  stars={room.Hotel.rate}
                  key={index}
                />
                );
              })}
              </div>
          ) : (
            <span className={roomsModule.loading}>
              <img
                src={loading}
                style={{
                  width: "15rem",
                  height: "15rem",
                  // marginLeft: "20rem",
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
