import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Hotels from "../pages/Hotels/hotels";
import Booking from "../components/Booking/BookingDetails";
import RoomsPage from "../pages/roomss/RoomsPage";
import Info from "../pages/Info/Info";
import Login from "../pages/log-in/Login.js";
import SignUp from "../pages/sign-up/SignUp.js";
import LayoutWithNavbar from "./LayoutWithNavbar.js";
import Dashboard from "../pages/Dashboard/Dashboard.js";
import UsersDashboard from "../pages/UsersDashboard/Users.js";
import HotelsDashboard from "../pages/HotelsDashboard/HotelsDashboard.js";
import RoomsDashboard from "../pages/RoomsDashboard/RoomsDashboard.js";
import HotelDetails from "../pages/HotelDetails/HotelDetails.js";
import Profile from "../pages/Profile/Profile.js";

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
          path="/hotel:id"
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
              <Info />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/room/:id?"
          element={
            <LayoutWithNavbar>
              <RoomsPage />
            </LayoutWithNavbar>
          }
        />
        <Route path="/hotel/login" element={<Login />} />
        <Route path="/room/login" element={<Login />} />
        <Route path="/info/login" element={<Login />} />
        <Route path="/hotel/signUp" element={<SignUp />} />
        <Route path="/room/signUp" element={<SignUp />} />
        <Route path="/info/signUp" element={<SignUp />} />
        <Route path="/hotel/login" element={<Login />} />
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
