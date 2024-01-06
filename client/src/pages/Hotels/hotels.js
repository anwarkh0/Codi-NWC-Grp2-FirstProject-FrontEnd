import React, { useContext, useEffect, useState } from "react";
import Footer from "../../layouts/footer/Footer";
import hotelsStyle from "./Hotels.module.css";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import RoomCard from "../../components/roomCard/RoomCard";
import UseApi from "../../hookes/useApi";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import HotelModal from "../../components/HotelModal/HotelModal";
import DeleteHotelModal from "../../components/HotelModal/DeleteHotelModal";
import { Helmet } from "react-helmet-async";

const Hotels = () => {
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [hotelData, setHotelData] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => {
    if (openAdd === true) {
      setOpenAdd(!openAdd);
    }
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiCall({
          url: "/hotel",
          method: "get",
        });
        setHotelData(response);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
    fetchData();
  }, [successAdd]);
  const flexButton = screenWidth < 650 ? "column" : "row";
  return (
    <>
      <Helmet>
        <title>Hotel Xpress - All Hotels</title>
        <meta
          name="description"
          content="Explore all hotels available at Hotel Xpress."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hotel Xpress - All Hotels" />
        <meta
          property="og:description"
          content="Explore all hotels available at Hotel Xpress."
        />
      </Helmet>
      <div className={hotelsStyle.container}>
        <span
          style={{
            display: "flex",
            flexDirection: flexButton,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>
            <Typography
              variant="h4"
              component="h4"
              fontWeight="700"
              fontFamily="Helvetica Neue"
              display="flex"
              justifyContent="flex-start"
              width="100%"
            >
              Our hotels
            </Typography>
            <Typography
              variant="p"
              component="p"
              fontSize="1rem"
              color="#585858"
              fontFamily="Helvetica Neue"
              mt="1rem"
              mb="1rem"
              display="flex"
              justifyContent="flex-start"
              width="100%"
            >
              Discover the epitome of luxury. Here are our hotels.
            </Typography>
          </span>
          {user && (user.role === "Manager" || user.role === "Admin") ? (
            <span
              style={{
                width: "fitContent",
              }}
              onClick={() => setOpenAdd(true)}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: "#088395 !important",
                  mt: screenWidth < 650 ? "1rem" : "",
                  mb: screenWidth < 650 ? "1rem" : "",
                }}
              >
                Add Hotel
              </Button>
            </span>
          ) : (
            ""
          )}
        </span>
        {!loading && hotelData ? (
          <div className={hotelsStyle.Hotels}>
            {hotelData.map((hotel, index) => {
              return <RoomCard data={hotel} key={index} />;
            })}
          </div>
        ) : (
          <span className={hotelsStyle.loading}>
            <img
              src={loadingImg}
              style={{
                width: "15rem",
                height: "15rem",
                scale: "1",
              }}
              alt="loading"
            />
          </span>
        )}

        <HotelModal
          type="add"
          open={openAdd}
          handleClose={handleClose}
          setSuccessAdd={setSuccessAdd}
        />
      </div>
      <Footer />
    </>
  );
};

export default Hotels;
