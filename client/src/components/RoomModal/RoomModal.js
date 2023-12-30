import { useEffect, useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  IconButton,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UseApi from "../../hookes/useApi";
import dayjs from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
dayjs.extend(customParseFormat);

const RoomModal = ({
  type,
  selectedRowData,
  open,
  handleClose,
  handleEditClose,
  setSuccessAdd,
  setSuccessEdit,
}) => {
  const { user } = useContext(AuthContext);
  const initialRoomInfo = {
    userId: user && user.id,
    number: "",
    quality: "High",
    maxpeople: "",
    isBooked: false,
    hotelId: "",
    price: "",
    description: "",
  };
  const { apiCall, loading, error } = UseApi();
  const [roomInfo, setRoomInfo] = useState(initialRoomInfo);
  const [hotels, setHotels] = useState([]);
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (type === "edit" && selectedRowData) {
      const updatedRoomInfo = {
        userId: user && user.id,
        number: selectedRowData.number ,
        quality: selectedRowData.quality ,
        guestNumber: selectedRowData.guestNumber,
        isBooked: selectedRowData.isBooked ,
        price: selectedRowData.price ,
        description: selectedRowData.description ,
        id: selectedRowData.id,
      };
      const { hotelId, ...updatedRoomWithoutHotelId } = roomInfo;
      setRoomInfo({ ...updatedRoomWithoutHotelId, ...updatedRoomInfo });
    }
  }, [type, selectedRowData, user]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRoomInfo((prevRoomInfo) => ({
      ...prevRoomInfo,
      [name]: value,
    }));
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall({
        url: "/room",
        method: "post",
        data: roomInfo,
      });
      await axios.post(
        `${process.env.REACT_APP_SQL_API}/room/image/add`,
        {
          icon: icon,
          roomId: response.data.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessAdd(true);
    } catch (error) {
      console.error(error);
    }finally{
      handleClose();
      setTimeout(()=>{
        setSuccessAdd(false)
      }, 30000)
    }
  };

  const handleEditRoom = async (e) => {
    e.preventDefault();
    console.log(roomInfo)
    try {
      await apiCall({
        url: "/room",
        method: "patch",
        data: roomInfo,
      });
      await axios.patch(
        `${process.env.REACT_APP_SQL_API}/room/image`,
        {
          icon: icon,
          id : 1 ,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessAdd(true);
    } catch (error) {
      console.error(error);
    }finally{
      handleClose();
      setTimeout(()=>{
        setSuccessEdit(false)
      }, 30000)
    }
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "25rem",
    marginTop: "1.5rem",
  };

  const spanStyle = {
    display: "flex",
    alignItems: "center",
  };

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
    justifyContent: "center",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose ? handleClose : handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              "& .MuiFormControl-root": {
                mt: 2,
                mb: 2,
                ml: 0,
                mr: 0,
                width: "25rem",
              },
              "& .MuiInputBase-root": {
                color: "black",
              },
              "& .MuiFormLabel-root ": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                border: "black !important",
              },
              "& .MuiBox-root css-3b5rqz": {
                margin: "2rem !important",
              },
              "& .MuiSvgIcon-root": {
                color: "#088395",
              },
              "& .MuiButton-containedPrimary": {
                bgcolor: "#2D99EF",
                mt: "1rem",
                mb: "1rem",
              },
              "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                border: "2px solid #088395 !important",
                borderRadius: "4px",
              },
              "& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend": {
                color: "#088395 !important",
              },
            }}
            autoComplete="off"
          >
            <div style={divStyle}>
              {type === "add" ? (
                <Typography
                  variant="h4"
                  component="h4"
                  color="#088395"
                  sx={{
                    textAlign: "left",
                    mt: 3,
                    mb: 3,
                    ml: "8px",
                    width: "fit-content",
                    fontWeight: "bold",
                  }}
                >
                  Add Room
                </Typography>
              ) : (
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    textAlign: "left",
                    mt: 3,
                    mb: 3,
                    ml: "8px",
                    width: "fit-content",
                    fontWeight: "bold",
                    color: "#088395",
                  }}
                >
                  Edit Room
                </Typography>
              )}
              <IconButton
                style={spanStyle}
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <form onSubmit={type === "add" ? handleAddRoom : handleEditRoom}>
              <Stack>
                <TextField
                  required
                  id="outlined-required1"
                  label="number"
                  placeholder="number"
                  name="number"
                  onChange={handleChange}
                  value={roomInfo.number}
                  type="number"
                />
                <TextField
                  required
                  id="outlined-required1"
                  label="description"
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                  value={roomInfo.description}
                  type="text"
                />
                <TextField
                  required
                  id="outlined-required2"
                  label="price"
                  placeholder="price"
                  name="price"
                  onChange={handleChange}
                  value={roomInfo.price}
                  type="number"
                />
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
                    isBooked
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={roomInfo.isBooked}
                    name="isBooked"
                    label="isBooked *"
                    onChange={handleChange}
                  >
                    <MenuItem disabled>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"false"}>No</MenuItem>
                    <MenuItem value={"true"}>Yes</MenuItem>
                  </Select>
                </FormControl>
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
                    Quality
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={roomInfo.quality}
                    name="quality"
                    label="quality *"
                    onChange={handleChange}
                  >
                    <MenuItem disabled>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="outlined-required"
                  label="Gest Number"
                  placeholder="Guest Number"
                  name="guestNumber"
                  onChange={handleChange}
                  value={roomInfo.guestNumber}
                  type="number"
                />
                {type === "add" && (
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
                      value={roomInfo.hotelId}
                      name="hotelId"
                      label="Hotel *"
                      onChange={handleChange}
                    >
                      <MenuItem disabled>
                        <em>None</em>
                      </MenuItem>
                      {hotels && hotels.length > 0 ? (
                        hotels.map((hotel) => (
                          <MenuItem
                            key={hotel.id}
                            value={hotel.id}
                            name="hotelId"
                          >
                            {hotel.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No hotels available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )}
                {type === "edit" && (
                  <Typography variant="body1" gutterBottom>
                    Selected Hotel: {selectedRowData && selectedRowData.hotel}
                  </Typography>
                )}
                <label htmlFor="icon">Cover Image</label>
                <input
                name="icon"
                  type="file"
                  onChange={(e) => setIcon(e.target.files[0])}
                />
                <div style={divStyle}>
                  <span
                    onClick={type === "add" ? handleAddRoom : handleEditRoom}
                  >
                    {loading === true ? (
                      <LoadingButton variant="contained" size="large" loading>
                        Loading
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{
                          bgcolor: "#088395 !important",
                        }}
                      >
                        Submit
                      </Button>
                    )}
                  </span>
                </div>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default RoomModal;
