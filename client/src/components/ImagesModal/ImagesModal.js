import { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import UseApi from "../../hookes/useApi";
import { AuthContext } from "../../context/authContext";

const ImagesModel = ({
  open,
  type,
  handleClose,
  setSuccessEdit,
  hotelId,
  roomId,
  selectedRowData,
  location,
}) => {
  const {user} = useContext(AuthContext)
  const { apiCall } = UseApi();
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hotelID, setHotelID] = useState();
  const [hotels, setHotels] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "white",
    border: "2px solid #171B24",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 0,
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await apiCall({ url: "/hotel", method: "get" });
        setHotels(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === 'page'){
      if (type === "add") {
        hotelId ? SubmitHotelImage(e) : SubmitRoomImage(e);
      } else if (type === "edit") {
        hotelId ? EditHotelImage(e) : EditRoomImage(e);
      }
    } else if (location === 'dashboard') {
      if (type === "add") {
        hotelID ? SubmitHotelImage(e) : SubmitRoomImage(e);
      } else if (type === "edit") {
        hotelId ? EditHotelImage(e) : EditRoomImage(e);
      }
    }
  };

  const SubmitHotelImage = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios.post(
        `${process.env.REACT_APP_SQL_API}/hotel/image/add`,
        {
          icon: icon,
          hotelId: location === "dashboard" ? hotelID : hotelId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessEdit(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      handleClose();
      setTimeout(() => {
        setSuccessEdit(false);
      }, 20000);
    }
  };

  const EditHotelImage = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios.patch(
        `${process.env.REACT_APP_SQL_API}/hotel/image`,
        {
          icon: icon,
          id:selectedRowData && selectedRowData.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessEdit(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      handleClose();
      setTimeout(() => {
        setSuccessEdit(false);
      }, 20000);
    }
  };

  const SubmitRoomImage = (e) => {
    try {
      setLoading(true);
      axios.post(
        `${process.env.REACT_APP_SQL_API}/room/image/add`,
        {
          icon: icon,
          roomId: roomId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessEdit(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      handleClose();
      setTimeout(() => {
        setSuccessEdit(false);
      }, 20000);
    }
  };

  const EditRoomImage = (e) => {
    try {
      setLoading(true);
      axios.patch(
        `${process.env.REACT_APP_SQL_API}/room/image`,
        {
          icon: icon,
          id: selectedRowData.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessEdit(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      handleClose();
      setTimeout(() => {
        setSuccessEdit(false);
      }, 20000);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid #088395 !important",
            borderRadius: "4px",
          },
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend": {
            color: "#088395 !important",
          },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "#088395",
          },
          "& .MuiSvgIcon-root": {
            color: "#088395",
          },
        }}
      >
        <Box sx={style}>
          <div style={divStyle}>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: "#088395 !important",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {type === "add" ? "Add your Image" : "Edit your Image"}
            </Typography>
            <IconButton
              style={span}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon
                sx={{
                  color: "#088395",
                }}
              />
            </IconButton>
          </div>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={(e) => handleSubmit(e)}
          >
            {type === "add" ? (
              <FormControl
                required
                sx={{
                  m: 1,
                  "& .MuiSvgIcon-root": {
                    color: "white",
                    "& .MuiList-root": {
                      bgcolor: "transparent",
                    },
                  },
                }}
              >
                <InputLabel id="demo-simple-select-required-label">
                  Hotel
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={selectedRowData && selectedRowData.Hotel.id}
                  name="hotelId"
                  label="Hotel *"
                  onChange={(e) => setHotelID(e.target.value)}
                >
                  <MenuItem disabled>
                    <em>None</em>
                  </MenuItem>
                  {hotels && hotels.length > 0 ? (
                    hotels
                    .filter((hotel) => hotel.userId === user.id)
                    .map((hotel) => (
                      <MenuItem key={hotel.id} value={hotel.id} name="hotelId">
                        {hotel.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hotels available</MenuItem>
                  )}
                </Select>
              </FormControl>
            ) : (
              <img src={`${process.env.REACT_APP_SQL_API}/${selectedRowData && selectedRowData.icon}`} alt="previousImage" height='250px' width='100%' style={{
                marginLeft: '8px',
                marginBottom: '1rem'
              }}/>
            )}
            <input
              type="file"
              onChange={(e) => setIcon(e.target.files[0])}
              style={{
                margin: "8px",
              }}
            />
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "8px",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#088395 !important",
                  mt: "1.5rem",
                }}
                type="submit"
              >
                Submit
              </Button>
            </span>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ImagesModel;
