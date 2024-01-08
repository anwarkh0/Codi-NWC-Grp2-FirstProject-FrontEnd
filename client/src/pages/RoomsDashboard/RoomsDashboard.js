import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import InfoCard from "../../components/InfoCard/InfoCard";
import TableComponent from "../../components/Table/Table";
import { Typography } from "@mui/material";
import Sidebar from "../../layouts/sidebar/sidebar";
import DeleteRoomModal from "../../components/RoomModal/DeleteRoomModal";
import toast, { Toaster } from "react-hot-toast";
import RoomModal from "../../components/RoomModal/RoomModal";
import UseApi from "../../hookes/useApi";
import styles from './RoomDashboard.module.css'
import { AuthContext } from "../../context/authContext";
import ImagesModel from "../../components/ImagesModal/ImagesModal";
import { Helmet } from "react-helmet-async";

const RoomsDashboard = () => {
  const {user} = useContext(AuthContext)
    const {apiCall,error, loading} = UseApi()
    const [roomData, setroomData] = useState(null);
    const [ImagesData, setImagesData] = useState(null);
    const [ReservationsData, setReservationsData] = useState(null);
    const [networkError, setNetworkError] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [selectedRowData, setSelectedRowData] = useState(null);
  const [tabValue, setTabValue] = useState(1);
    const [openRoom, setOpenRoom] = useState(false);
    const [openEditRoom, setOpenEditRoom] = useState(false);
    const [openDeleteRoom, setOpenDeleteRoom] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [openEditImage, setOpenEditImage] = useState(false);
    const [openDeleteImage, setOpenDeleteImage] = useState(false);
    const [openReservation, setOpenReservation] = useState(false);
    const [openEditReservation, setOpenEditReservation] = useState(false);
    const [openDeleteReservation, setOpenDeleteReservation] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [successEdit, setSuccessEdit] = useState(false);
    const [activeLi, setActiveLi] = useState({
      hotel: true,
      images: false,
      rule: false,
      rating: false,
    });
    const handleOpenRoom = () => setOpenRoom(true);
    const handleOpenEditRoom= () => setOpenEditRoom(true);
    const handleOpenDeleteRoom = () => setOpenDeleteRoom(true);
    const handleOpenImage = () => setOpenImage(true);
    const handleEditOpenImage = () => setOpenEditImage(true);
    const handleOpenDeleteImage = () => setOpenDeleteImage(true);
    const handleOpenReservation = () => setOpenReservation(true);
    const handleEditOpenReservation = () => setOpenEditReservation(true);
    const handleOpenDeleteReservation = () => setOpenDeleteReservation(true);
    const handleClose = () => {
      setOpenRoom(false);
      setOpenEditRoom(false);
      setOpenDeleteRoom(false);
      setOpenImage(false)
      setOpenEditImage(false)
      setOpenDeleteImage(false)
      setOpenReservation(false)
      setOpenEditReservation(false)
      setOpenDeleteReservation(false)
    };
  
    useEffect(() => {
      const handleResize = () => {
        const newWid = window.innerWidth;
        setScreenWidth(newWid);
      };
      handleResize()
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    useEffect(() => {
      const handleOffline = () => {
        setNetworkError(!networkError);
      };
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("offline", handleOffline);
      };
    });

    useEffect(()=>{
        const fetchRooms =async () =>{
          try {
            const response = await apiCall({ url: "/room", method: "get" })
            setroomData(response.data)
          } catch (error) {
            console.error(error);
          }
        }

        const fetchImages = async () => {
          const response = await apiCall({
            url: '/room/image',
            method: 'get'
          })
          setImagesData(response)
        }

        const fetchReservation = async () => {
          const response = await apiCall({
            url: '/reservation',
            method: 'get'
          })
          setReservationsData(response)
        }

        fetchReservation()
        fetchImages()
        fetchRooms()
    },[successDelete])
    const mapDataToColumns = (roomData, visibleFields) => {
      return roomData.map((item) => {
        const newItem = {};
        visibleFields.forEach((field) => {
          newItem[field] = item[field];
        });
        return newItem;
      });
    };

  const filterData = (data , forWhat) =>{
    if (user.role === 'Hotel Manager'){
      if (forWhat === 'reservation' || forWhat === 'room') {
        const filteredData = data.filter((item) => item.userId === user.id )
        return filteredData;
      }else  if ( forWhat === 'image' ){
        const filteredData = data.filter((item) =>item.Room.userId === user.id)
        return filteredData;
      }
    } else {
      return data
    }
  }
    return(
        <Box
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: "5rem" }}
      >
        <Helmet>
        <title>All Rooms Overview</title>
        <meta
          name="description"
          content="View a comprehensive overview of all rooms within Hotel Xpress's network. 
          Access detailed information, performance metrics, and manage settings across 
          multiple rooms properties in one convenient dashboard."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="All Rooms Overview" />
        <meta
          property="og:description"
          content="View a comprehensive overview of all rooms within Hotel Xpress's network. 
          Access detailed information, performance metrics, and manage settings across 
          multiple rooms properties in one convenient dashboard."
        />
      </Helmet>
        <Sidebar />
        <Toaster />
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: "left",
            mb: 5,
            mt: "5rem",
            fontWeight: "bold",
          }}
        >
          Manage Rooms
        </Typography>
        {networkError ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="error">
              Network Issue
            </Typography>
          </div>
        ) : loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Loading...</Typography>
          </div>
        ) : error ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="error">
              Error loading data
            </Typography>
          </div>
        ) : (
          <>
            <Grid
              container
              md={11.8}
              justifyContent="space-between"
              sx={{
                "& .MuiGrid2-root": {
                  display: "flex",
                  alignContent: "space-between",
                  justifyContent:
                    screenWidth > 1200 ? "space-between" : "flex-start",
                },
                "& .MuiGrid2-container": {
                  mb: "2rem",
                  alignContent: "space-between",
                },
              }}
            >
              <Grid
                md={12}
                container
                spacing={2}
                sx={{
                  display: "flex",
                  rowGap: "2rem",
                }}
              >
                <Grid
                  xs={12}
                  md={4}
                  sx={{
                    padding: 0,
                  }}
                >
                  <InfoCard
                    title={"Total Rooms"}
                    number={`238 room`}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                  sx={{
                    padding: 0,
                  }}
                >
                  <InfoCard
                    title={"Booked Rooms"}
                    number={`128 room`}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                  sx={{
                    padding: 0,
                  }}
                >
                  <InfoCard
                    title={"Available rooms"}
                    number={`110 room`}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{
            border: 'solid 1px #b3b3b3',
            padding: '0.5rem'
          }}>
            <div>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: "1rem 0 2rem 0",
                  padding: 0,
                  flexWrap: "wrap",
                }}
              >
                <li
                  onClick={() => {
                    setTabValue(1);
                    setActiveLi({
                      hotel: true,
                      images: false,
                      rule: false,
                      rating: false,
                    });
                  }}
                  className={`${styles.li} ${
                    activeLi.hotel === true ? styles.active : ""
                  }`}
                >
                  Rooms
                </li>
                <li
                  onClick={() => {
                    setTabValue(2);
                    setActiveLi({
                      hotel: false,
                      images: true,
                      rule: false,
                      rating: false,
                    });
                  }}
                  className={`${styles.li} ${
                    activeLi.images === true ? styles.active : ""
                  }`}
                >
                  Images
                </li>
                <li
                  onClick={() => {
                    setTabValue(3);
                    setActiveLi({
                      hotel: false,
                      images: false,
                      rule: true,
                      rating: false,
                    });
                  }}
                  className={`${styles.li} ${
                    activeLi.rule === true ? styles.active : ""
                  }`}
                >
                  Reservations
                </li>
              </ul>
            </div>
            {tabValue === 1 ? (
              <>
                <span
                  style={{
                    width: "fit-content",
                  }}
                  onClick={handleOpenRoom}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    sx={{
                      ":hover": {
                        bgcolor: "#035e6b !important",
                      },
                      bgcolor: "#088395 !important",
                      fontFamily: "Helvetica Neue",
                    }}
                  >
                    Add Room
                  </Button>
                </span>
                <TableComponent
                  data={roomData !== null && filterData(roomData , 'room')}
                  isEdit={true}
                  ForWhat={"rooms"}
                  handleEditOpen={handleOpenEditRoom}
                  setSelectedRowData={setSelectedRowData}
                  handleOpenDelete={handleOpenDeleteRoom}
                />
                <RoomModal
                  open={openRoom}
                  handleClose={handleClose}
                  type="add"
                  setSuccessAdd={setSuccessAdd}
                />
                <RoomModal
                  type="edit"
                  open={openEditRoom}
                  handleClose={handleClose}
                  selectedRowData={selectedRowData && selectedRowData}
                  setSuccessAdd={setSuccessAdd}
                  setSuccessEdit={setSuccessEdit}
                />
                <DeleteRoomModal
                  selectedRowData={selectedRowData && selectedRowData}
                  handleOpenDeleteHotel={handleOpenDeleteRoom}
                  open={openDeleteRoom}
                  handleClose={handleClose}
                  setSuccessDelete={setSuccessDelete}
                  forWhat="hotel"
                />
              </>
            ) : tabValue === 2 ? (
              <>
                <span
                  style={{
                    width: "fit-content",
                  }}
                  onClick={handleOpenImage}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    sx={{
                      ":hover": {
                        bgcolor: "#035e6b !important",
                      },
                      bgcolor: "#088395 !important",
                      fontFamily: "Helvetica Neue",
                    }}
                  >
                    Add Image
                  </Button>
                </span>
                <TableComponent
                  data={ImagesData !== null && filterData(ImagesData , 'image')}
                  isEdit={true}
                  ForWhat={"roomImages"}
                  handleEditOpen={handleEditOpenImage}
                  setSelectedRowData={setSelectedRowData}
                  handleOpenDelete={handleOpenDeleteImage}
                />
                <ImagesModel
                  open={openImage}
                  handleClose={handleClose}
                  type="add"
                  setSuccessEdit={setSuccessEdit}
                  location={"dashboard"}
                />
                <ImagesModel
                  type="edit"
                  open={openEditImage}
                  handleClose={handleClose}
                  selectedRowData={selectedRowData && selectedRowData}
                  setSuccessEdit={setSuccessEdit}
                  location={"dashboard"}
                />
                <DeleteRoomModal
                  selectedRowData={selectedRowData && selectedRowData}
                  open={openDeleteImage}
                  handleClose={handleClose}
                  setSuccessDelete={setSuccessDelete}
                  forWhat="RoomImage"
                />
              </>
            ) : tabValue === 3 ? (
              <>
              { user && user.role === 'Customer' ? (
                <span
                  style={{
                    width: "fit-content",
                  }}
                  onClick={handleOpenReservation}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    sx={{
                      ":hover": {
                        bgcolor: "#035e6b !important",
                      },
                      bgcolor: "#088395 !important",
                      fontFamily: "Helvetica Neue",
                    }}
                  >
                    Add Reservation
                  </Button>
                </span>
              ): ""}
                <TableComponent
                  data={ReservationsData !== null && filterData(ReservationsData , 'rate')}
                  isEdit={true}
                  ForWhat={"reservation"}
                  handleEditOpen={handleEditOpenReservation}
                  setSelectedRowData={setSelectedRowData}
                  handleOpenDelete={handleOpenDeleteReservation}
                />
                <ReservationsData
                  type="add"
                  openRating={openReservation}
                  handleClose={handleClose}
                  setSuccessRate={setSuccessAdd}
                />
                <ReservationsData
                  type="edit"
                  openRating={openEditReservation}
                  handleClose={handleClose}
                  setSuccessRate={setSuccessEdit}
                  selectedRowData={selectedRowData && selectedRowData}
                />
                <DeleteRoomModal
                  selectedRowData={selectedRowData && selectedRowData}
                  open={openDeleteReservation}
                  handleClose={handleClose}
                  setSuccessDelete={setSuccessDelete}
                  forWhat="reservation"
                />
              </>
            ) : (
              ""
            )}
          </Box>
          </>
        )}
      </Box>
    )
}
export default RoomsDashboard ;