import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import Footer from "../../layouts/footer/Footer";
import hotelsStyle from "./Hotels.module.css";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import UseApi from "../../hookes/useApi";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import HotelModal from "../../components/HotelModal/HotelModal";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const LazyHotelCard = lazy(() => import("../../components/roomCard/RoomCard"));

const Hotels = () => {
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [hotelData, setHotelData] = useState(null);
  const [hotelName, sethotelName] = useState();
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

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await apiCall({
      method: "post",
      url: "/hotel/byName",
      data: {
        hotelName: hotelName,
      },
    });
    setHotelData(response);
  };
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
        <AnimatePresence>
          <span
            style={{
              display: "flex",
              flexDirection: flexButton,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                width: "100%",
              }}
            >
              <span
                style={{
                  display: "flex",
                }}
              >
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
                <TextField
                  label="Search"
                  placeholder="Search"
                  name="hotel"
                  onChange={(e) => sethotelName(e.target.value)}
                  value={hotelName}
                  sx={{
                    "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                      border: "2px solid #088395 !important",
                      borderRadius: "4px",
                    },
                    "& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend":
                      {
                        color: "#088395 !important",
                      },
                    "& .MuiInputLabel-root.Mui-focused ": {
                      color: "#088395",
                    },
                  }}
                />
                <IconButton onClick={(e) => handleSearch(e)}>
                  <KeyboardArrowUpIcon />
                </IconButton>
              </span>
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
          </span>
          <span style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
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
                return (
                  <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <LazyHotelCard data={hotel} />
                    </motion.div>
                  </Suspense>
                );
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
                loading="lazy"
              />
            </span>
          )}

          <HotelModal
            type="add"
            open={openAdd}
            handleClose={handleClose}
            setSuccessAdd={setSuccessAdd}
          />
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default Hotels;
