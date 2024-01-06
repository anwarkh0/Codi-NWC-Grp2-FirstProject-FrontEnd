import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import InfoCard from "../../components/InfoCard/InfoCard";
import TableComponent from "../../components/Table/Table";
import { Typography } from "@mui/material";
import UserModal from "../../components/UserModal/UserModal";
import Sidebar from "../../layouts/sidebar/sidebar";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteUserModal from "../../components/UserModal/DeleteUserModal";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const users = [
  {
    id : 1 ,
    firstName: "John",
    lastName: "Doe",
    image: "https://example.com/avatar1.jpg",
    password: "password123",
    role: "user",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-02T15:30:00Z",
  },
  {
    id : 2,
    firstName: "Alice",
    lastName: "Smith",
    image: "https://example.com/avatar2.jpg",
    password: "securepass",
    role: "admin",
    email: "alice.smith@example.com",
    dob: "1985-05-15",
    createdAt: "2023-02-05T08:30:00Z",
    updatedAt: "2023-02-10T18:45:00Z",
  },
  {
    id : 3 ,
    firstName: "Bob",
    lastName: "Johnson",
    image: "https://example.com/avatar3.jpg",
    password: "pass123",
    role: "user",
    email: "bob.johnson@example.com",
    dob: "1988-09-20",
    createdAt: "2023-03-10T10:15:00Z",
    updatedAt: "2023-03-15T14:20:00Z",
  },
  {
    id : 4 ,
    firstName: "Eva",
    lastName: "Anderson",
    image: "https://example.com/avatar4.jpg",
    password: "evaPass",
    role: "admin",
    email: "eva.anderson@example.com",
    dob: "1992-04-05",
    createdAt: "2023-04-01T09:45:00Z",
    updatedAt: "2023-04-06T16:00:00Z",
  },
  {
    id: 5 ,
    firstName: "Sam",
    lastName: "Williams",
    image: "https://example.com/avatar5.jpg",
    password: "samPass123",
    role: "user",
    email: "sam.williams@example.com",
    dob: "1987-12-12",
    createdAt: "2023-05-12T11:30:00Z",
    updatedAt: "2023-05-18T17:10:00Z",
  },
  {
    id: 6 ,
    firstName: "Emma",
    lastName: "Davis",
    image: "https://example.com/avatar6.jpg",
    password: "emmaPass",
    role: "admin",
    email: "emma.davis@example.com",
    dob: "1995-08-22",
    createdAt: "2023-06-20T14:45:00Z",
    updatedAt: "2023-06-25T19:30:00Z",
  },
  {
    id: 7 ,
    firstName: "Chris",
    lastName: "Miller",
    image: "https://example.com/avatar7.jpg",
    password: "chrisPass",
    role: "user",
    email: "chris.miller@example.com",
    dob: "1983-03-03",
    createdAt: "2023-07-15T16:20:00Z",
    updatedAt: "2023-07-20T20:50:00Z",
  },
  {
    id: 8 ,
    firstName: "Olivia",
    lastName: "Brown",
    image: "https://example.com/avatar8.jpg",
    password: "oliviaPass",
    role: "admin",
    email: "olivia.brown@example.com",
    dob: "1991-11-10",
    createdAt: "2023-08-10T18:00:00Z",
    updatedAt: "2023-08-15T22:15:00Z",
  },
  {
    id: 9,
    firstName: "Daniel",
    lastName: "Wilson",
    image: "https://example.com/avatar9.jpg",
    password: "danielPass",
    role: "user",
    email: "daniel.wilson@example.com",
    dob: "1989-06-18",
    createdAt: "2023-09-05T19:30:00Z",
    updatedAt: "2023-09-10T23:45:00Z",
  },
  {
    id: 10 ,
    firstName: "Sophia",
    lastName: "White",
    image: "https://example.com/avatar10.jpg",
    password: "sophiaPass",
    role: "admin",
    email: "sophia.white@example.com",
    dob: "1993-02-28",
    createdAt: "2023-10-01T21:15:00Z",
    updatedAt: "2023-10-07T01:30:00Z",
  },
  {
    id: 11 ,
    firstName: "Matthew",
    lastName: "Clark",
    image: "https://example.com/avatar11.jpg",
    password: "matthewPass",
    role: "user",
    email: "matthew.clark@example.com",
    dob: "1986-07-07",
    createdAt: "2023-11-10T22:45:00Z",
    updatedAt: "2023-11-16T03:00:00Z",
  },
  {
    id: 12 ,
    firstName: "Ava",
    lastName: "Taylor",
    image: "https://example.com/avatar12.jpg",
    password: "avaPass",
    role: "admin",
    email: "ava.taylor@example.com",
    dob: "1994-09-14",
    createdAt: "2023-12-05T00:00:00Z",
    updatedAt: "2023-12-10T04:15:00Z",
  },
  {
    id: 13 ,
    firstName: "William",
    lastName: "Harris",
    image: "https://example.com/avatar13.jpg",
    password: "williamPass",
    role: "user",
    email: "william.harris@example.com",
    dob: "1984-04-24",
    createdAt: "2024-01-01T02:30:00Z",
    updatedAt: "2024-01-06T06:45:00Z",
  },
  {
    id: 14 ,
    firstName: "Mia",
    lastName: "Roberts",
    image: "https://example.com/avatar14.jpg",
    password: "miaPass",
    role: "admin",
    email: "mia.roberts@example.com",
    dob: "1996-01-09",
    createdAt: "2024-02-15T04:00:00Z",
    updatedAt: "2024-02-20T08:15:00Z",
  },
  {
    id: 15, 
    firstName: "Liam",
    lastName: "Jones",
    image: "https://example.com/avatar15.jpg",
    password: "liamPass",
    role: "user",
    email: "liam.jones@example.com",
    dob: "1982-08-31",
    createdAt: "2024-03-10T05:30:00Z",
    updatedAt: "2024-03-15T09:45:00Z",
  },
];

const UsersDashboard = () => {
  const [userData, setUserData] = useState(null);
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
    setUserData(users)
  })

  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column" , ml: '5rem'}}
    >
       <Helmet>
        <title>All Users Overview</title>
        <meta
          name="description"
          content="View a comprehensive overview of all users within Hotel Xpress's network. 
          Access detailed information, performance metrics, and manage settings across 
          multiple users properties in one convenient dashboard."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="All Users Overview" />
        <meta
          property="og:description"
          content="View a comprehensive overview of all users within Hotel Xpress's network. 
          Access detailed information, performance metrics, and manage settings across 
          multiple users properties in one convenient dashboard."
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
        Manage Users
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
                  title={"Total Users"}
                  number={`18 Users`}
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
                  title={"Total Admins"}
                  number={`2 Admins`}
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
                  title={"Total Managers"}
                  number={`16 Customer`}
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
              <Button variant="contained" color='primary' size='large'startIcon={<AddIcon/>} sx={{
                bgcolor: '#088395 !important'
              }}>Add User</Button>
            </span>
          <TableComponent
            data={userData !== null && userData}
            isEdit={true}
            ForWhat={"users"}
            handleEditOpen={handleEditOpen}
            setSelectedRowData={setSelectedRowData}
            handleOpenDelete={handleOpenDelete}
          />
          <UserModal open={open} handleClose={handleClose} type="add" />
          <UserModal
            type="edit"
            open={openEdit}
            handleClose={handleClose}
            selectedRowData={selectedRowData && selectedRowData}
            setSuccessAdd={setSuccessAdd}
            setSuccessEdit={setSuccessEdit}
          />
          <DeleteUserModal
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
  );
};

export default UsersDashboard;
