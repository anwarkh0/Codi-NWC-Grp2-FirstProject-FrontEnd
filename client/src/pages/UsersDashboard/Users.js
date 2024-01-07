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

import UseApi from "../../hookes/useApi";
import axios from "axios";


const UsersDashboard = () => {
  const [userData, setUserData] = useState([]);
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
  const { apiCall } = UseApi()

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
    const fetchUser = async () => {
      try {
        const response = await /* axios.get("http://localhost:4000/user/getAll") */apiCall({ url: "/user/getAll", method: "get" })
        setUserData(response.data)
      } catch (error) {
        console.log("error fetching", error);
      }
    }
    fetchUser()

  }, [])

  const countAdmin = () => {
    let count = 0
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].role === "admin") {
        count++
      }
    }
    return ((!count || count === 1) && count+" admin") ||count+" admins"
  } 
  const countManager = () => {
    let count = 0
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].role === "manager") {
        count++
      }
    }
    return ((!count || count === 1) && count+" manager") ||count+" managers"
  }

  console.log("firstsss", userData)
  return (

    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: '5rem' }}
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
                  number={`${userData.length} users`}
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
                  number={countAdmin()}
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
                  number={countManager()}
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
            <Button variant="contained" color='primary' size='large' startIcon={<AddIcon />} sx={{
              bgcolor: '#088395 !important'
            }}>Add User</Button>
          </span>
          <TableComponent
            data={userData}
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
