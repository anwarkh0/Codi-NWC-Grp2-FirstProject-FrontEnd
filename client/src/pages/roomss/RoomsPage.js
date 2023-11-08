import React from "react";
import { useParams } from "react-router-dom";
import Rooms from "../../components/Rooms/Rooms";
import Footer from "../../layouts/footer/Footer";

const RoomsPage = () => {
const {hotelId}=useParams();
  return (
    <>
      <Rooms idHotel={hotelId}/>
      <Footer />
    </>
  );
};

export default RoomsPage;
