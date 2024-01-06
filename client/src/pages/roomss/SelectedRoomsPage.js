import React from "react";
import Footer from "../../layouts/footer/Footer";
import roomsModule from "./rooms.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RoomCard from "../../components/roomCard/RoomCard.js";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import nodata from "../../assets/images/nodata.jpg";
import UseApi from "../../hookes/useApi.js";
import { Helmet } from "react-helmet-async";

const SelectedRoomsPage = () => {
  const location = useLocation();
  const { apiCall, loading, error } = UseApi();
  const [roomData, setRoomData] = useState([]);
  const select = location.state && location.state.select;

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
  return (
    <>
      <Helmet>
        <title>Hotel Xpress - Selected Rooms</title>
        <meta
          name="description"
          content="Explore all the luxurious rooms available at Hotel Xpress."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hotel Xpress - Selected Rooms" />
        <meta
          property="og:description"
          content="Explore the details of our selected rooms at Hotel Xpress."
        />
      </Helmet>
      <div className={roomsModule.wrapper}>
        <h1 className={roomsModule.header}>Selected Rooms Section</h1>
        <p className={roomsModule.subHeader}>
          rooms result depends on your search specification
        </p>
        {!loading && roomData.length > 0 ? (
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
      <Footer />
    </>
  );
};

export default SelectedRoomsPage;
