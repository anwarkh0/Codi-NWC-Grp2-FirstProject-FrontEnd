import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

const ImagesModel = ({ open, handleClose, setSuccessEdit, hotelId , roomId}) => {
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const SubmitHotelImage = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios.post(
        `${process.env.REACT_APP_SQL_API}/hotel/image/add`,
        {
          icon: icon,
          hotelId: hotelId,
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
        setSuccessEdit(false)
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
        setSuccessEdit(false)
      }, 20000);
    }
  }

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
              Add your Image
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
            onSubmit={(e) => hotelId ? SubmitHotelImage(e) :SubmitRoomImage(e) }
          >
            <input type="file" onChange={(e) => setIcon(e.target.files[0])} />
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
                  mt: '1.5rem'
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
