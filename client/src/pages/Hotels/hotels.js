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

const Hotels = () => {
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [hotelData, setHotelData] = useState(null);
  const [oneHotelData, setOneHotelData] = useState();
  const [successAdd , setSuccessAdd] = useState(false)
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => setOpenAdd(!openAdd);

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
      <div className={hotelsStyle.container}>
        <span
          style={{
            display: "flex",
            flexDirection: flexButton,
            justifyContent: "space-between",
            width :'100%'
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
                  mt: screenWidth < 650 ? '1rem' : "",
                  mb: screenWidth < 650 ? '1rem' : ""
                }}
              >
                Add Hotel
              </Button>
            </span>
          ) : (
            ""
          )}
        </span>
        <div className={hotelsStyle.Hotels}>
          {!loading && hotelData ? (
            hotelData.map((hotel, index) => {
              return <RoomCard data={hotel} key={index} />;
            })
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
        </div>
        <HotelModal
          type="add"
          open={openAdd}
          handleClose={handleClose}
          setSuccessAdd={setSuccessAdd}
          selectedRowData={oneHotelData && oneHotelData}
        />
      </div>
      <Footer />
    </>
  );
};

export default Hotels;
