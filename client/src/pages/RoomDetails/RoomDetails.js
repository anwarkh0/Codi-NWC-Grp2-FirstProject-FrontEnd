import ReservationModal from "../../components/Booking/BookingDetails";

//   return (
//     <div style={{
//       marginTop: '10rem'
//     }}>
//       <button
//         onClick={handleOpen}
//       >
//         Reserve
//       </button>
//       {open && <ReservationModal open={open} handleClose={handleClose} />}
//     </div> 
//   );
// };

// export default RoomDetails
import { useParams } from "react-router-dom";
import Carousell from "../../components/Carousel/Carousel";
import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UseApi from "../../hookes/useApi";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import RoomCard from "../../components/roomCard/RoomCard";
import styles from "./RoomDetails.module.css";
import RatingModal from "../../components/RatingModal/RatingModal";

const RoomDetails = () => {
  const { roomId } = useParams();
  const { apiCall, loading, error } = UseApi();
  const [roomData, setRoomData] = useState();
  const [images , setImages] = useState()
  const [otherRoomData , setOtherRoomData] = useState()
  const [openReserve, setOpenReserve] = useState(false);
  const [successReserve, setSuccessReserve] = useState(false);
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

  const handleOpenReserve = () => setOpenReserve(true);
  const handleCloseReserve = () => setOpenReserve(false);

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
        setRoomData(response.data);
        setImages(response.data.RoomImages)
        console.log(response.data.RoomImages)
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOtherRooms = async () => {
      try {
        const response = await apiCall({
          url: "/room/byHotel",
          method: "post",
          data: {
            id: roomData.hotelId,
          },
        });
        setOtherRoomData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherRooms()
    fetchData();
  }, []);

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
            <Carousell images={images && images }/>
          </Box>
          <Typography
            variant="h4"
            component="h4"
            fontWeight="700"
            fontFamily="Helvetica Neue"
            mb="1rem"
          >
            Room Description
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontSize="1rem"
            color="#585858"
            fontFamily="Helvetica Neue"
            mb="4rem"
          >
            {roomData && roomData.Hotel.description}
          </Typography>
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
            {roomData &&
              otherRoomData &&
              otherRoomData.map((room, index) => (
                <RoomCard
                  roomId={room.id}
                  image={room.image}
                  address={room.address}
                  hotel={room.hotel}
                  price={room.price}
                  key={index}
                />
              ))}
          </div>
          <ReservationModal
            setSuccessReserve={setSuccessReserve}
            handleCloseReserve={handleCloseReserve}
            openReserve={openReserve}
            roomId={roomId}
          />
        </>
      )}
    </Box>
  );
};
export default RoomDetails;

