import { useParams } from "react-router-dom";
import Carousell from "../../components/Carousel/Carousel";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UseApi from "../../hookes/useApi";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import RoomCard from "../../components/roomCard/RoomCard";
import styles from "./HotelDetails.module.css";
import RatingModal from "../../components/RatingModal/RatingModal";
import { AuthContext } from "../../context/authContext";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import HotelModal from "../../components/HotelModal/HotelModal";
import RulesModal from "../../components/RulesModal/RulesModal";
import ImagesModel from "../../components/ImagesModal/ImagesModal";
import RoomModal from "../../components/RoomModal/RoomModal";
import { Delete, Edit } from "@mui/icons-material";
import DeleteHotelModal from "../../components/HotelModal/DeleteHotelModal";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [hotelData, setHotelData] = useState();
  const [roomData, setRoomData] = useState();
  const [rateData, setRateData] = useState();
  const [images, setImages] = useState();
  const [openRating, setOpenRating] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [successRate, setSuccessRate] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [openImage, setOpenImage] = useState(false);
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

  const handleDeleteClose = () => {
    if (openDelete === true) {
      setOpenDelete(false);
    }
  };

  const handleClose = () => {
    if (openEdit === true) {
      setOpenEdit(!openEdit);
    } else if (openRating === true) {
      setOpenRating(!openRating);
    } else if (openRules) {
      setOpenRules(false);
    } else if (openImage) {
      setOpenImage(!openImage);
    } else if (openRoom) {
      setOpenRoom(!openRoom);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall({
          url: "/hotel/id",
          method: "post",
          data: {
            id: hotelId,
          },
        });
        
        const room = await apiCall({
          url: 'room/byHotel',
          method: 'post',
          data: {
            hotelId : hotelId
          },
        })
        setHotelData(response);
        setRoomData(room);
        setImages(response.hotel.HotelImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [successEdit ]);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await apiCall({
          url: "/rating/byHotel",
          method: "post",
          data: {
            id: hotelId,
          },
        });
        setRateData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRating();
  }, [successRate]);

  const flexButton = screenWidth < 400 ? "column" : "row";
  const flexRate = screenWidth < 400 ? "column" : "row";
  const alignRate = screenWidth < 400 ? "flex-start" : "center";
  const flexAlign = screenWidth < 600 ? "flex-start" : "flex-end";
  return (
    <Box
      sx={{
        margin: "10rem auto",
        width: "70%",
        "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
          border: "1.5px solid #088395 !important",
          borderRadius: "4px",
        },
        "& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend": {
          color: "#088395 !important",
        },
      }}
    >
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
      ) : (
        <>
          <span
            style={{
              display: "flex",
              flexDirection: flexButton,
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              fontWeight="700"
              fontFamily="Helvetica Neue"
              mb={screenWidth < 600 ? "1rem" : 0}
            >
              {hotelData && hotelData.hotel.name}
            </Typography>
            {user && (user.role === "Manager" || user.role === "Admin") ? (
              <span
                style={{
                  width: "fitContent",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => setOpenImage(true)}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: "#088395 !important",
                    mb: screenWidth < 600 ? "1.5rem" : 0,
                  }}
                >
                  Add Images
                </Button>
              </span>
            ) : (
              ""
            )}
          </span>
          <Box
            display="flex"
            justifyContent="center"
            width={
              screenWidth < 300
                ? "180px"
                : screenWidth < 400
                ? "250px"
                : screenWidth < 600
                ? "300px"
                : screenWidth < 1000
                ? "500px"
                : "100%"
            }
            margin="0"
          >
            <Carousell images={images && images} />
          </Box>
          <span
            style={{
              display: "flex",
              flexDirection: flexRate,
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              fontWeight="700"
              fontFamily="Helvetica Neue"
              mb="1rem"
            >
              Hotel Info
            </Typography>
            {user && (user.role === "Manager" || user.role === "Admin") ? (
              <span>
                  <IconButton
                  onClick={() => setOpenEdit(true)}
                    sx={{
                      color: "#088395",
                      mb: screenWidth < 600 ? "1.5rem" : 0,
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                  onClick={() => setOpenDelete(true)}
                    sx={{
                      color: "#088395",
                      mb: screenWidth < 600 ? "1.5rem" : 0,
                    }}
                  >
                    <Delete />
                  </IconButton>
              </span>
            ) : (
              ""
            )}
          </span>
          <Typography
            variant="p"
            component="p"
            fontSize="1rem"
            color="#585858"
            fontFamily="Helvetica Neue"
            mb="1.2rem"
          >
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              Owner :{" "}
            </span>{" "}
            {hotelData &&
              hotelData.hotel.User.firstName +
                " " +
                hotelData.hotel.User.lastName}
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontSize="1rem"
            color="#585858"
            fontFamily="Helvetica Neue"
            mb="1.2rem"
          >
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              City :{" "}
            </span>{" "}
            {hotelData && hotelData.hotel.city}
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontSize="1rem"
            color="#585858"
            fontFamily="Helvetica Neue"
            mb="1.2rem"
          >
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              Address :{" "}
            </span>{" "}
            {hotelData && hotelData.hotel.address}
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontSize="1rem"
            color="#585858"
            fontFamily="Helvetica Neue"
            mb="4rem"
          >
            <div
              style={{
                fontWeight: "600",
                fontSize: "1.2rem",
                marginBottom: "0.8rem",
              }}
            >
              Description :{" "}
            </div>{" "}
            {hotelData && hotelData.hotel.description}
          </Typography>
          <span
            style={{
              display: "flex",
              flexDirection: flexButton,
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              fontWeight="700"
              fontFamily="Helvetica Neue"
              mb="1rem"
            >
              Hotel Rules
            </Typography>
            {user && (user.role === "Manager" || user.role === "Admin") ? (
              <span
                style={{
                  width: "fitContent",
                }}
                onClick={() => setOpenRules(true)}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: "#088395 !important",
                    mb: "1.5rem",
                  }}
                >
                  Add Rule
                </Button>
              </span>
            ) : (
              ""
            )}
          </span>
          <Grid container spacing={4}>
            {hotelData &&
              hotelData.hotel.Rules.map((rule, index) => (
                <Grid
                  item
                  display="flex"
                  md={4}
                  key={index}
                  sx={{
                    color: "#585858",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_SQL_API}/${rule.icon}`}
                    alt={`rule-${index + 1}`}
                    width="35px"
                    height="35px"
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    ml="0.5rem"
                    component="p"
                    variant="p"
                    fontSize="1rem"
                    display="flex"
                    alignItems="center"
                  >
                    {rule.description}
                  </Typography>
                </Grid>
              ))}
          </Grid>
          <span
            style={{
              display: "flex",
              flexDirection: flexButton,
              justifyContent: "space-between",
              marginTop: "4rem",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              fontWeight="700"
              fontFamily="Helvetica Neue"
              mb="1rem"
            >
              Hotel Rooms
            </Typography>
            {user && (user.role === "Manager" || user.role === "Admin") ? (
              <span
                style={{
                  width: "fitContent",
                }}
                onClick={() => setOpenRoom(true)}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: "#088395 !important",
                  }}
                >
                  Add Room
                </Button>
              </span>
            ) : (
              ""
            )}
          </span>
          <div className={styles.gridView}>
            {hotelData &&
              roomData &&
              roomData.map((room, index) => (
                <RoomCard
                  roomId={room.id}
                  image={room.RoomImages[0]}
                  address={room.address}
                  hotel={room.hotel}
                  price={room.price}
                  quality={room.quality}
                  key={index}
                />
              ))}
          </div>
          <span
            style={{
              display: "flex",
              flexDirection: flexButton,
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              fontWeight="700"
              fontFamily="Helvetica Neue"
              mb="1rem"
            >
              Ratings
            </Typography>
            {user ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => setOpenRating(true)}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#088395 !important",
                    mb: screenWidth < 600 ? "1.5rem" : 0,
                  }}
                  startIcon={<StarIcon />}
                >
                  Rate this hotel
                </Button>
              </span>
            ) : (
              ""
            )}
          </span>
          <Box display="flex" flexDirection="column">
            <div
              style={{
                display: "flex",
                flexDirection: flexButton,
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  marginTop: "0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontFamily: "Helvetica Neue",
                  fontSize: "1.2rem",
                  rowGap: "1rem",
                }}
              >
                Total Reviews : {rateData && rateData.length} Reviews
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    precision={0.5}
                    value={hotelData && hotelData.rating}
                    sx={{
                      mr: "1rem",
                    }}
                  />{" "}
                  {hotelData && hotelData.rating}
                </span>
              </p>
            </div>
            <span
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                marginTop: "1rem",
              }}
            >
              {rateData &&
                rateData.map((rate, index) => (
                  <Box key={rate.id} borderBottom={"1px solid gray"}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: alignRate,
                        flexDirection: flexRate,
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          color: "#088395",
                          fontSize: "1.5rem",
                          margin: "1rem 0",
                          fontWeight: "600",
                        }}
                      >
                        {rate.User.firstName.toLowerCase() +
                          " " +
                          rate.User.lastName.toLowerCase()}
                      </p>
                      <Rating precision={0.5} value={rate.rate} />
                    </span>
                    <p
                      style={{
                        color: "#585858",
                        marginTop: 0,
                      }}
                    >
                      {rate.feedback}
                    </p>
                  </Box>
                ))}
            </span>
          </Box>
          <RatingModal
            setSuccessRate={setSuccessRate}
            handleClose={handleClose}
            openRating={openRating}
            hotelId={hotelId}
          />
          <HotelModal
            type="edit"
            setSuccessEdit={setSuccessEdit}
            open={openEdit}
            handleClose={handleClose}
            selectedRowData={hotelData && hotelData.hotel}
          />
          <RulesModal
            openRules={openRules}
            handleClose={handleClose}
            setSuccessEdit={setSuccessEdit}
            hotelId={hotelData && hotelData.hotel.id}
          />
          <ImagesModel
            open={openImage}
            handleClose={handleClose}
            setSuccessEdit={setSuccessEdit}
            hotelId={hotelId}
          />
          <RoomModal
            type="add"
            open={openRoom}
            handleClose={handleClose}
            hotelId={hotelId}
            setSuccessAdd={setSuccessEdit}
          />
          <DeleteHotelModal
            openDelete={openDelete}
            handleClose={handleDeleteClose}
            selectedRowData={hotelData && hotelData.hotel}
            hotelPage={true}
            setSuccessDelete={setSuccessDelete}
          />
        </>
      )}
    </Box>
  );
};
export default HotelDetails;
