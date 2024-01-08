import { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import UseApi from "../../hookes/useApi";
import { AuthContext } from "../../context/authContext";

const RulesModal = ({
  openRules,
  handleClose,
  setSuccessEdit,
  hotelId,
  type,
  selectedRowData,
}) => {
  const {user} = useContext(AuthContext)
  const { apiCall } = UseApi();
  const [icon, setIcon] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hotels, setHotels] = useState();
  const [hotelID, setHotelID] = useState();

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

  const AddRule = (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = axios.post(
        `${process.env.REACT_APP_SQL_API}/rule`,
        {
          icon: icon,
          hotelId: hotelId ? hotelId : hotelID,
          description: description,
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

  const EditRule = (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = axios.patch(
        `${process.env.REACT_APP_SQL_API}/rule`,
        {
          id: selectedRowData.id,
          icon: icon,
          hotelId: hotelId,
          description: description,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "add") {
      AddRule(e);
    } else if (type === "edit") {
      EditRule(e)
    }
  };

  return (
    <>
      <Modal
        open={openRules}
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
              {type === "add" ? "Add your Rule" : "Edit your Rule"}
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
            }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Stack mt="1rem" mb="1rem" width="100%" rowGap={"1rem"}>
              {!hotelId && type === "add" ? (
                <FormControl
                  required
                  sx={{
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
                    value={hotelID}
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
              ) : (
                ""
              )}
              <TextField
                required
                id="outlined-required1"
                label="Description"
                placeholder="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                defaultValue={
                  type === "edit" && selectedRowData
                    ? selectedRowData.description
                    : ""
                }
              />
              {!hotelId && type === "edit" ? (
                <Avatar
                  src={`${process.env.REACT_APP_SQL_API}/${
                    selectedRowData && selectedRowData.icon
                  }`}
                />
              ) : (
                ""
              )}
              <p
                style={{
                  margin: 0,
                }}
              >
                Upload here your rule icon*
              </p>
              <input type="file" onChange={(e) => setIcon(e.target.files[0])} />
            </Stack>
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#088395 !important",
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

export default RulesModal;
