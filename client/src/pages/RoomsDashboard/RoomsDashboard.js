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

const rooms = [
    {id : 1 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 2 , Hotel : 'Marimar' , price : 987 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 3 , Hotel : 'Aquarius' , price : 122 , number : 2 , maxpeople : 2 , isBooked : 'false'},
    {id : 4 , Hotel : 'Aquarius' , price : 265 , number : 3 , maxpeople : 2 , isBooked : 'false'},
    {id : 5 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 6 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 7 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 8 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 9 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 10 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 11 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 12 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 13 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 14 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
    {id : 15 , Hotel : 'Aquarius' , price : 234 , number : 1 , maxpeople : 2 , isBooked : 'false'},
]

const RoomsDashboard = () => {
    const [roomData, setroomData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [successEdit, setSuccessEdit] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleEditOpen = () => setOpenEdit(true);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleClose = () => {
      setOpen(false);
      setOpenEdit(false);
      setOpenDelete(false);
    };
  
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

    useEffect(()=>{
        setroomData(rooms)
    })

    return(
        <Box
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: "5rem" }}
      >
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
              <span
                style={{
                  width: "fit-content",
                }}
                onClick={handleOpen}
              >
                <Button variant="contained" size='large'startIcon={<AddIcon/>} sx={{
                    bgcolor: "#088395 !important"
                }}>Add Room</Button>
              </span>
            <TableComponent
              data={roomData !== null && roomData}
              isEdit={true}
              ForWhat={"rooms"}
              handleEditOpen={handleEditOpen}
              setSelectedRowData={setSelectedRowData}
              handleOpenDelete={handleOpenDelete}
            />
            <RoomModal open={open} handleClose={handleClose} type="add" />
            <RoomModal
              type="edit"
              open={openEdit}
              handleClose={handleClose}
              selectedRowData={selectedRowData && selectedRowData}
              setSuccessAdd={setSuccessAdd}
              setSuccessEdit={setSuccessEdit}
            />
            <DeleteRoomModal
              selectedRowData={selectedRowData && selectedRowData}
              handleOpenDelete={handleOpenDelete}
              openDelete={openDelete}
              handleClose={handleClose}
              setSuccessDelete={setSuccessDelete}
              setOpenDelete={setOpenDelete}
            />
          </>
        )}
      </Box>
    )
}
export default RoomsDashboard ;