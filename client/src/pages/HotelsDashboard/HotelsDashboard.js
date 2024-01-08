import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import InfoCard from "../../components/InfoCard/InfoCard";
import TableComponent from "../../components/Table/Table";
import { Typography } from "@mui/material";
import Sidebar from "../../layouts/sidebar/sidebar";
import toast, { Toaster } from "react-hot-toast";
import HotelModal from "../../components/HotelModal/HotelModal";
import DeleteHotelModal from "../../components/HotelModal/DeleteHotelModal";
import axios from "axios";
import UseApi from "../../hookes/useApi";
import ImagesModel from "../../components/ImagesModal/ImagesModal";
import styles from "./HotelsDashboard.module.css";
import RulesModal from "../../components/RulesModal/RulesModal";
import RatingModal from "../../components/RatingModal/RatingModal";
import { AuthContext } from "../../context/authContext";

const HotelsDashboard = () => {
  const {user} = useContext(AuthContext)
  const [hotelData, sethotelData] = useState(null);
  const [ImagesData, setImagesData] = useState(null);
  const [rateData, setRateData] = useState();
  const [rulesData, setRulesData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tabValue, setTabValue] = useState(1);
  const [networkError, setNetworkError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openHotel, setOpenHotel] = useState(false);
  const [openEditHotel, setOpenEditHotel] = useState(false);
  const [openDeleteHotel, setOpenDeleteHotel] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);
  const [openDeleteImage, setOpenDeleteImage] = useState(false);
  const [openRate, setOpenRate] = useState(false);
  const [openEditRate, setOpenEditRate] = useState(false);
  const [openDeleteRate, setOpenDeleteRate] = useState(false);
  const [openRule, setOpenRule] = useState(false);
  const [openEditRule, setOpenEditRule] = useState(false);
  const [openDeleteRule, setOpenDeleteRule] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [activeLi, setActiveLi] = useState({
    hotel: true,
    images: false,
    rule: false,
    rating: false,
  });
  const handleOpenHotel = () => setOpenHotel(true);
  const handleEditOpenHotel = () => setOpenEditHotel(true);
  const handleOpenDeleteHotel = () => setOpenDeleteHotel(true);
  const handleOpenImage = () => setOpenImage(true);
  const handleEditOpenImage = () => setOpenEditImage(true);
  const handleOpenDeleteImage = () => setOpenDeleteImage(true);
  const handleOpenRate = () => setOpenRate(true);
  const handleEditOpenRate = () => setOpenEditRate(true);
  const handleOpenDeleteRate = () => setOpenDeleteRate(true);
  const handleOpenRule = () => setOpenRule(true);
  const handleEditOpenRule = () => setOpenEditRule(true);
  const handleOpenDeleteRule = () => setOpenDeleteRule(true);
  const handleClose = () => {
    setOpenHotel(false);
    setOpenEditHotel(false);
    setOpenDeleteHotel(false);
    setOpenImage(false);
    setOpenEditImage(false);
    setOpenDeleteImage(false);
    setOpenRate(false);
    setOpenEditRate(false);
    setOpenDeleteRate(false);
    setOpenRule(false);
    setOpenEditRule(false);
    setOpenDeleteRule(false);
  };
  const { apiCall } = UseApi();

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
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SQL_API}/hotel`
        );
        setLoading(false);
        sethotelData(response.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchImageData = async () => {
      try {
        const response = await apiCall({
          url: "/hotel/image",
          method: "get",
        });
        setImagesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRulesData = async () => {
      try {
        const response = await apiCall({
          url: "/rule",
          method: "get",
        });
        setRulesData(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRatingsData = async () => {
      try {
        const response = await apiCall({
          url: "/rating",
          method: "get",
        });
        setRateData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRulesData();
    fetchImageData();
    fetchHotelData();
    fetchRatingsData();
  }, [successAdd, successDelete, successEdit]);


  const filterData = (data , forWhat) =>{
    if (user.role === 'Hotel Manager'){
      if (forWhat === 'hotel' || forWhat === 'rate') {
        const filteredData = data.filter((item) => item.userId === user.id )
        return filteredData;
      }else  if (forWhat === 'rule' || forWhat === 'image' ){
        const filteredData = data.filter((item) =>item.Hotel.userId === user.id)
        return filteredData;
      }
    } else {
      return data
    }
  }
  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: "5rem" }}
    >
      <Sidebar />
      <Toaster />
      <Typography
        variant="h3"
        component="h3"
        fontFamily="Helvetica Neue"
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
          <Typography variant="h5" color="error" fontFamily="Helvetica Neue">
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
          <Typography variant="h5" fontFamily="Helvetica Neue">
            Loading...
          </Typography>
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
                <InfoCard title={"Total Hotels"} number={`73 hotel`} />
              </Grid>
              <Grid
                xs={12}
                md={4}
                sx={{
                  padding: 0,
                }}
              >
                <InfoCard title={"Booked Hotels"} number={`23 hotel`} />
              </Grid>
              <Grid
                xs={12}
                md={4}
                sx={{
                  padding: 0,
                }}
              >
                <InfoCard title={"Available Hotels"} number={`50 hotel`} />
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
                  Hotels
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
                  Rules
                </li>
                <li
                  onClick={() => {
                    setTabValue(4);
                    setActiveLi({
                      hotel: false,
                      images: false,
                      rule: false,
                      rating: true,
                    });
                  }}
                  className={`${styles.li} ${
                    activeLi.rating === true ? styles.active : ""
                  }`}
                >
                  Ratings
                </li>
              </ul>
            </div>
            {tabValue === 1 ? (
              <>
                <span
                  style={{
                    width: "fit-content",
                  }}
                  onClick={handleOpenHotel}
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
                    Add Hotel
                  </Button>
                </span>
                <TableComponent
                  data={hotelData !== null && filterData(hotelData , 'hotel')}
                  isEdit={true}
                  ForWhat={"hotels"}
                  handleEditOpen={handleEditOpenHotel}
                  setSelectedRowData={setSelectedRowData}
                  handleOpenDelete={handleOpenDeleteHotel}
                />
                <HotelModal
                  open={openHotel}
                  handleClose={handleClose}
                  type="add"
                  setSuccessAdd={setSuccessAdd}
                />
                <HotelModal
                  type="edit"
                  open={openEditHotel}
                  handleClose={handleClose}
                  selectedRowData={selectedRowData && selectedRowData}
                  setSuccessAdd={setSuccessAdd}
                  setSuccessEdit={setSuccessEdit}
                />
                <DeleteHotelModal
                  selectedRowData={selectedRowData && selectedRowData}
                  handleOpenDeleteHotel={handleOpenDeleteHotel}
                  open={openDeleteHotel}
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
                  ForWhat={"hotelImages"}
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
                  hotelId={true}
                  type="edit"
                  open={openEditImage}
                  handleClose={handleClose}
                  selectedRowData={selectedRowData && selectedRowData}
                  setSuccessEdit={setSuccessEdit}
                  location={"dashboard"}
                />
                <DeleteHotelModal
                  selectedRowData={selectedRowData && selectedRowData}
                  open={openDeleteImage}
                  handleClose={handleClose}
                  setSuccessDelete={setSuccessDelete}
                  forWhat="hotelImage"
                />
              </>
            ) : tabValue === 4 ? (
              <>
              { user && user.role === 'Customer' ? (
                <span
                  style={{
                    width: "fit-content",
                  }}
                  onClick={handleOpenRate}
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
                    Add Rate
                  </Button>
                </span>
              ): ""}
                <TableComponent
                  data={rateData !== null && filterData(rateData , 'rate')}
                  isEdit={true}
                  ForWhat={"ratings"}
                  handleEditOpen={handleEditOpenRate}
                  setSelectedRowData={setSelectedRowData}
                  handleOpenDelete={handleOpenDeleteRate}
                />
                <RatingModal
                  type="add"
                  openRating={openRate}
                  handleClose={handleClose}
                  setSuccessRate={setSuccessAdd}
                />
                <RatingModal
                  type="edit"
                  openRating={openEditRate}
                  handleClose={handleClose}
                  setSuccessRate={setSuccessEdit}
                  selectedRowData={selectedRowData && selectedRowData}
                />
                <DeleteHotelModal
                  selectedRowData={selectedRowData && selectedRowData}
                  open={openDeleteRate}
                  handleClose={handleClose}
                  setSuccessDelete={setSuccessDelete}
                  forWhat="rate"
                />
              </>
            ) : tabValue === 3 ? (
              <>
                <span
                  style={{
                    width: "fit-content",
                  }}
                  onClick={handleOpenRule}
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
                    Add Rule
                  </Button>
                </span>
                <TableComponent
                  data={(rulesData !== null)&& filterData(rulesData , 'rule')}
                  isEdit={true}
                  ForWhat={"hotelRules"}
                  handleEditOpen={handleEditOpenRule}
                  setSelectedRowData={setSelectedRowData}
                  handleOpenDelete={handleOpenDeleteRule}
                />
                <RulesModal
                  openRules={openRule}
                  type="add"
                  handleClose={handleClose}
                  setSuccessEdit={setSuccessEdit}
                  selectedRowData={selectedRowData && selectedRowData}
                />
                <RulesModal
                  openRules={openEditRule}
                  type="edit"
                  handleClose={handleClose}
                  setSuccessEdit={setSuccessEdit}
                  selectedRowData={selectedRowData && selectedRowData}
                />
                <DeleteHotelModal
                  selectedRowData={selectedRowData && selectedRowData}
                  open={openDeleteRule}
                  handleClose={handleClose}
                  setSuccessDelete={setSuccessDelete}
                  forWhat="rule"
                />
              </>
            ) : (
              ""
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
export default HotelsDashboard;
