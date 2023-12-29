import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Hotels from "../pages/Hotels/hotels";
import Booking from "../components/Booking/BookingDetails";
import RoomsPage from "../pages/roomss/RoomsPage";
import Login from "../pages/log-in/Login.js";
import SignUp from "../pages/sign-up/SignUp.js";
import LayoutWithNavbar from "./LayoutWithNavbar.js";
import Dashboard from "../pages/Dashboard/Dashboard.js";
import UsersDashboard from "../pages/UsersDashboard/Users.js";
import HotelsDashboard from "../pages/HotelsDashboard/HotelsDashboard.js";
import RoomsDashboard from "../pages/RoomsDashboard/RoomsDashboard.js";
import HotelDetails from "../pages/HotelDetails/HotelDetails.js";
import Profile from "../pages/Profile/Profile.js";
import RoomDetails from "../pages/RoomDetails/RoomDetails.js";
import AboutUs from "../pages/AboutUs/AboutUs.js";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <LayoutWithNavbar>
              <Home />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/hotel"
          element={
            <LayoutWithNavbar>
              <Hotels />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/hotel/:hotelId"
          element={
            <LayoutWithNavbar>
              <HotelDetails />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/booking"
          element={
            <LayoutWithNavbar>
              <Booking />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/info"
          element={
            <LayoutWithNavbar>
              <AboutUs />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/room"
          element={
            <LayoutWithNavbar>
              <RoomsPage />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/room/:roomId?"
          element={
            <LayoutWithNavbar>
              <RoomDetails />
            </LayoutWithNavbar>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UsersDashboard />} />
        <Route path="/dashboard/rooms" element={<RoomsDashboard />} />
        <Route path="/dashboard/hotels" element={<HotelsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
