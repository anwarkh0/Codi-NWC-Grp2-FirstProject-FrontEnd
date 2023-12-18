import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  IconButton,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button ,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton'
import customParseFormat from "dayjs/plugin/customParseFormat";

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
  const [loading, setLoading] = useState(false);
  const [number, setnumber] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState("");
  const [Hotel, setHotel] = useState("");
  const [isBooked, setisBooked] = useState("");
  const [maxpeople, setmaxpeople] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (type === "edit" && selectedRowData) {
      setnumber(selectedRowData.number);
      setprice(selectedRowData.price);
      setImage(selectedRowData.image);
      setHotel(selectedRowData.Hotel);
      setisBooked(selectedRowData.isBooked);
      setmaxpeople(selectedRowData.maxpeople);
      const dobValue = dayjs(selectedRowData.dob);
      setDob(dobValue);
    }
  }, [type, selectedRowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImage(value);
    } else if (name === "number") {
      setnumber(value);
    } else if (name === "price") {
      setprice(value);
    } else if (name === "Hotel") {
      setHotel(value);
    } else if (name === "maxpeople") {
      setmaxpeople(value);
    } else if (name === "dob") {
      setDob(value);
    } else if (name === "isBooked") {
      setisBooked(value);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
  };

  const handleEditRoom = async (e) => {
    e.preventDefault();
  };

  const handleFromClear = () => {
    setnumber("");
    setprice("");
    setmaxpeople("");
    setImage("");
    setisBooked("");
    setHotel("");
    setnumber("");
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
                border: "1.5px solid #088395 !important",
                borderRadius: "4px",
              },
              '& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend':{
                color : '#088395 !important'
              }
            }}
            autoComplete="off"
          >
            <div style={divStyle}>
              {type === "add" ? (
                <Typography
                  variant="h4"
                  component="h4"
                  color='#088395'
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
                    color: '#088395'
                  }}
                >
                  Edit Room
                </Typography>
              )}
              <IconButton
                style={spanStyle}
                onClick={() => {
                  handleClose();
                  handleFromClear();
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
                  value={number}
                  type="number"
                />
                <TextField
                  required
                  id="outlined-required2"
                  label="price"
                  placeholder="price"
                  name="price"
                  onChange={handleChange}
                  value={price}
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
                    value={isBooked}
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
                <TextField
                  required
                  id="outlined-required"
                  label="maxpeople"
                  placeholder="maxpeople"
                  name="maxpeople"
                  onChange={handleChange}
                  value={maxpeople}
                  type="number"
                />
                <TextField
                  required
                  id="outlined-required12"
                  label="Hotel"
                  placeholder="Hotel name"
                  name="Hotel"
                  onChange={handleChange}
                  value={maxpeople}
                />

                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                />
                <div style={divStyle}>
                  <span
                    onClick={type === "add" ? handleAddRoom : handleEditRoom}
                  >
                    {loading === true ? (
                      <LoadingButton variant="contained" size="large" loading >Loading</LoadingButton>
                    ): (
                      <Button variant="contained" size="large" type="submit" sx={{
                        bgcolor: '#088395 !important'
                      }}>Submit</Button>
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
