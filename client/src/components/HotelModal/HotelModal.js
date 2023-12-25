import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  IconButton,
  TextField,
  Button ,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton'
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const HotelModal = ({
  type,
  selectedRowData,
  open,
  handleClose,
  handleEditClose,
  setSuccessAdd,
  setSuccessEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [description, setdescription] = useState("");
  const [address, setaddress] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (type === "edit" && selectedRowData) {
      setname(selectedRowData.name);
      setcity(selectedRowData.city);
      setdescription(selectedRowData.description);
      setaddress(selectedRowData.address);
    }
  }, [type, selectedRowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setname(value);
    } else if (name === "city") {
      setcity(value);
    } else if (name === "address") {
      setaddress(value);
    } else if (name === "description") {
      setdescription(value);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_SQL_API}/hotel`, {
        name : name , 
        city : city , 
        address : address , 
        description : description
      })      
      setLoading(false)
      setSuccessAdd(true)
    } catch (error) {
      setLoading(false)
      setError(true)
      setSuccessAdd(false)
    }finally{
      setLoading(false)
      handleClose()
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.patch(`${process.env.REACT_APP_SQL_API}/hotel`, {
        id : selectedRowData.id ,
        name : name , 
        city : city , 
        address : address , 
        description : description
      })      
      setLoading(false)
      setSuccessAdd(true)
    } catch (error) {
      setLoading(false)
      setError(true)
      setSuccessEdit(false)
    }finally{
      setLoading(false)
      handleClose()
    }
  };

  const handleFromClear = () => {
    setname("");
    setcity("");
    setaddress("");
    setdescription("");
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
                  Add Hotel
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
                  }}
                >
                  Edit Hotel
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
            <form onSubmit={type === "add" ? handleAddUser : handleEditUser}>
              <Stack>
                <TextField
                  required
                  id="outlined-required1"
                  label="Name"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={name}
                />
                <TextField
                  required
                  id="outlined-required2"
                  label="City"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  value={city}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Address"
                  placeholder="Address"
                  name="address"
                  onChange={handleChange}
                  value={address}
                />
                <TextField
                  required
                  id="outlined-required12"
                  label="Description"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={description}
                />
                <div style={divStyle}>
                  <span
                    onClick={type === "add" ? handleAddUser : handleEditUser}
                  >
                    {loading === true ? (
                      <LoadingButton variant="contained" size="large" loading >Loading</LoadingButton>
                    ): (
                      <Button variant="contained" size="large" type="submit" sx={{
                        ":hover":{
                          bgcolor: '#035e6b !important'
                        } ,
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
export default HotelModal;
