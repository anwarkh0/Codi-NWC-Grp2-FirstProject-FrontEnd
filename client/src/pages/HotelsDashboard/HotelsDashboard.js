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
import HotelModal from "../../components/HotelModal/HotelModal";
import DeleteHotelModal from "../../components/HotelModal/DeleteHotelModal";


const hotels = [
    {id : '1', name: 'Aquarius1', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '2', name: 'Aquarius2', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '3', name: 'Aquarius3', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '4', name: 'Aquarius4', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '5', name: 'Aquarius5', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '6', name: 'Aquarius6', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '7', name: 'Aquarius7', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '8', name: 'Aquarius8', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '9', name: 'Aquarius9', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '10', name: 'Aquarius10', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '11', name: 'Aquarius11', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '12', name: 'Aquarius12', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '13', name: 'Aquarius13', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '14', name: 'Aquarius14', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
    {id : '15', name: 'Aquarius15', city: 'Menyeh' , address : 'North Lebanon' , rate: 4.5 , roomNumber : 20},
]
const HotelsDashboard = () => {
    const [hotelData, sethotelData] = useState(null);
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
        sethotelData(hotels)
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
          Manage Hotels
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
                    title={"Total Hotels"}
                    number={`73 hotel`}
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
                    title={"Booked Hotels"}
                    number={`23 hotel`}
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
                    title={"Available Hotels"}
                    number={`50 hotel`}
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
                }}>Add Hotel</Button>
              </span>
            <TableComponent
              data={hotelData !== null && hotelData}
              isEdit={true}
              ForWhat={"hotels"}
              handleEditOpen={handleEditOpen}
              setSelectedRowData={setSelectedRowData}
              handleOpenDelete={handleOpenDelete}
            />
            <HotelModal open={open} handleClose={handleClose} type="add" />
            <HotelModal
              type="edit"
              open={openEdit}
              handleClose={handleClose}
              selectedRowData={selectedRowData && selectedRowData}
              setSuccessAdd={setSuccessAdd}
              setSuccessEdit={setSuccessEdit}
            />
            <DeleteHotelModal
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
export default HotelsDashboard ;