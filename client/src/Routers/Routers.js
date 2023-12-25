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
import HotelDetails from "../pages/HotelDetails/HotelDetails.js"
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
        ></Route>
        <Route
          path="/hotel"
          element={
            <LayoutWithNavbar>
              <Hotels />
            </LayoutWithNavbar>
          }
        ></Route>
        <Route
          path="/hotel:id"
          element={
            <LayoutWithNavbar>
              <HotelDetails />
            </LayoutWithNavbar>
          }
        ></Route>
        <Route
          path="/booking"
          element={
            <LayoutWithNavbar>
              <Booking />
            </LayoutWithNavbar>
          }
        ></Route>
        <Route
          path="/info"
          element={
            <LayoutWithNavbar>
              <Info />
            </LayoutWithNavbar>
          }
        ></Route>
        <Route
          path="/room/:id?"
          element={
            <LayoutWithNavbar>
              <RoomsPage />
            </LayoutWithNavbar>
          }
        ></Route>
        <Route path="/logIn" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/users" element={<UsersDashboard />}></Route>
        <Route path="/dashboard/rooms" element={<RoomsDashboard />}></Route>
        <Route path="/dashboard/hotels" element={<HotelsDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
