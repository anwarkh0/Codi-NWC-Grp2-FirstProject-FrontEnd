import ReservationModal from "../../components/Booking/BookingDetails";
import { useParams } from "react-router-dom";
import Carousell from "../../components/Carousel/Carousel";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UseApi from "../../hookes/useApi";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import RoomCard from "../../components/roomCard/RoomCard";
import ImagesModel from "../../components/ImagesModal/ImagesModal";
import styles from "./RoomDetails.module.css";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit } from "@mui/icons-material";
import RoomModal from "../../components/RoomModal/RoomModal";
import DeleteRoomModal from "../../components/RoomModal/DeleteRoomModal";
import NoteModal from "../../components/Note/Note";
import { Helmet } from "react-helmet-async";

const RoomDetails = () => {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const { apiCall, loading, error } = UseApi();
  const [roomData, setRoomData] = useState();
  const [images, setImages] = useState();
  const [otherRoomData, setOtherRoomData] = useState();
  const [openReserve, setOpenReserve] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [successReserve, setSuccessReserve] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
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

  const handleClose = () => {
    if (openDelete) {
      setOpenDelete(false);
    } else if (openReserve) {
      setOpenReserve(false);
    } else if (openImage) {
      setOpenImage(false);
    } else if (openEdit) {
      setOpenEdit(false);
    } else if (openNote){
      setOpenNote(false)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall({
          url: "/room/singleRoom",
          method: "post",
          data: {
            id: roomId,
          },
        });
        const otherRooms = await apiCall({
          url: "/room/byHotel",
          method: "post",
          data: {
            hotelId: response.data.hotelId,
          },
        });
        setOtherRoomData(otherRooms);
        setRoomData(response.data);
        setImages(response.data.RoomImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [successEdit, successReserve , roomId]);

  const handleReserve = () => {
    if (!user) {
      setOpenNote(true);
    } else {
      setOpenReserve(true);
    }
  };
  const flexButton = screenWidth < 300 ? "column" : "row";
  const flexRate = screenWidth < 400 ? "column" : "row";

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
      {roomData && (
        <Helmet>
          <title>{` Room ${roomData.number} - Details`}</title>
          <meta
            name="description"
            content={`Explore detailed information about Room ${roomData.number}. 
            Discover amenities, pricing, and availability for this room within the hotel.`}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            property="og:title"
            content={`Room ${roomData.number} - Details`}
          />
          <meta
            property="og:description"
            content={`Explore detailed information about Room ${roomData.number}. 
          Discover amenities, pricing, and availability for this room within the hotel.`}
          />
        </Helmet>
      )}

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
              Room Numer {roomData && roomData.number}
            </Typography>
            {user && (user.role === "Manager" || user.role === "Admin") ? (
              <IconButton
                onClick={() => setOpenDelete(true)}
                sx={{
                  color: "#088395",
                  mb: screenWidth < 600 ? "1.5rem" : 0,
                }}
              >
                <Delete />
              </IconButton>
            ) : (
              ""
            )}
          </span>
          {user && (user.role === "Admin" || user.role === "Manager") ? (
            <span
              style={{
                width: "fitContent",
                display: "flex",
                alignItems: "center",
                marginTop: '2rem'
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
              Room Info
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
              Price :{" "}
            </span>{" "}
            {roomData && roomData.price}$ /night
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
              Guest Numeber :{" "}
            </span>{" "}
            {roomData && roomData.guestNumber} {roomData && roomData.guestNumber === 1 ? ('guest') :( 'guests')}
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
              Hotel Name:{" "}
            </span>{" "}
            {roomData && roomData.Hotel.name}
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
              Hotel Manager :{" "}
            </span>{" "}
            {roomData && roomData.Hotel.User.firstName + " " +roomData.Hotel.User.lastName }
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
              Quality :{" "}
            </span>{" "}
            {roomData && roomData.quality}
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
              Description :{" "}
            </span>{" "}
            {roomData && roomData.description}
          </Typography>
          {user && user.role === "Customer"}
          <Typography
            variant="h4"
            component="h4"
            fontWeight="700"
            fontFamily="Helvetica Neue"
            mb="1rem"
            mt="4rem"
          >
            Reserve This Room
          </Typography>
          <span
              style={{
                width: "fitContent",
                display: "flex",
                alignItems: "center",
                marginTop: '1rem'
              }}
              onClick={(e) => handleReserve(e)}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: "#088395 !important",
                  mb: screenWidth < 600 ? "1.5rem" : 0,
                }}
              >
                Reserve
              </Button>
            </span>
          <Typography
            variant="h4"
            component="h4"
            fontWeight="700"
            fontFamily="Helvetica Neue"
            mb="1rem"
            mt="4rem"
          >
            Other Rooms
          </Typography>
          <div className={styles.gridView}>
            {otherRoomData &&
              otherRoomData
                .filter((room) => room.id !== roomData.id)
                .map((room, index) => (
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
          <ReservationModal
            setSuccessReserve={setSuccessReserve}
            handleClose={handleClose}
            open={openReserve}
            roomId={roomId}
            roomData={roomData && roomData}
          />
          <ImagesModel
            open={openImage}
            handleClose={handleClose}
            setSuccessEdit={setSuccessEdit}
            roomId={roomId}
          />
          <RoomModal
            type="edit"
            setSuccessEdit={setSuccessEdit}
            open={openEdit}
            handleClose={handleClose}
            selectedRowData={roomData && roomData}
          />
          <DeleteRoomModal
            openDelete={openDelete}
            handleClose={handleClose}
            roomPage={true}
            selectedRowData={roomData && roomData}
            setSuccessDelete={setSuccessDelete}
          />
          <NoteModal openNote={openNote} handleClose={handleClose} />
        </>
      )}
    </Box>
  );
};
export default RoomDetails;
