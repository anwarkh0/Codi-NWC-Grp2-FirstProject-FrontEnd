import React, { useEffect, useState } from "react";
import Footer from "../../layouts/footer/Footer";
import axios from "axios";
import hotelsStyle from "./Hotels.module.css";
import loading from "../../assets/images/LOADING-1.gif";
import RoomCard from "../../components/roomCard/RoomCard";

const Hotels = () => {
  const [hotelData, setHotelData] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsloading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_SQL_API}/hotel`
        );
        if (response) {
          setHotelData(response.data);
          setIsloading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className={hotelsStyle.container}>
        <h1>Popular Hotels</h1>
        <p className={hotelsStyle.slogan}>
          Discover the epitome of luxury. Here are our hotels.
        </p>
        <div className={hotelsStyle.Hotels}>
          {!isLoading && hotelData ? (
            hotelData.map((hotel, index) => {
              return <RoomCard data={hotel} key={index} />;
            })
          ) : (
            <span className={hotelsStyle.loading}>
              <img
                src={loading}
                style={{
                  width: "15rem",
                  height: "15rem",
                  scale: "1",
                }}
                alt="loading"
              />
            </span>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hotels;
