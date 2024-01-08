import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import SelectedRoomsPage from "../pages/roomss/SelectedRoomsPage.js";
import NotFound from "../pages/NotFound/NotFound.js";
import Unauthorized from "../pages/Unauthorized/Unauthorized.js";
import { AuthContext } from "../context/authContext.js";
import loadingImg from "../assets/images/hotel-loading-gif.gif";

const PrivateRoute = ({ element, roles }) => {
  const { user, checkUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (user === null) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          src={loadingImg}
          style={{
            width: "15rem",
            height: "15rem",
            scale: "1",
          }}
          alt="loading"
        />
      </div>
    );
  } else {
    if (user && roles && roles.includes(user.role)) {
      return element;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }
};

const AppRouter = () => {
  const { checkUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (checkUser) {
      setLoading(true);
    } else if (checkUser === false) {
      setLoading(false);
    }
  }, []);
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
          path="/selectedrooms"
          element={
            <LayoutWithNavbar>
              <SelectedRoomsPage />
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
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={<Profile />}
              roles={["Admin", "Hotel Manager", "Customer"]}
            />
          }
        />
        <Route path="/logIn" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard />}
              roles={["Admin", "Hotel Manager"]}
            />
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute
              element={<UsersDashboard />}
              roles={["Admin"]}
            />
          }
        />
        <Route
          path="/dashboard/rooms"
          element={
            <PrivateRoute
              element={<RoomsDashboard />}
              roles={["Admin", "Hotel Manager"]}
            />
          }
        />
        <Route
          path="/dashboard/hotels"
          element={
            <PrivateRoute
              element={<HotelsDashboard />}
              roles={["Admin", "Hotel Manager"]}
            />
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
