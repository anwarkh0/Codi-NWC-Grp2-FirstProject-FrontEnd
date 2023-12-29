import React from "react";
import { useParams } from "react-router-dom";
import SelectedRooms from "../../components/Rooms/SelectedRooms";
import Footer from "../../layouts/footer/Footer";

const SelectedRoomsPage = () => {
const {id}=useParams();
  return (
    <>
      <SelectedRooms idHotel={id}/>
      <Footer />
    </>
  );
};

export default SelectedRoomsPage;