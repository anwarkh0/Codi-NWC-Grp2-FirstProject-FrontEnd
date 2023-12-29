import { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton, Rating, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import UseApi from "../../hookes/useApi";
import { AuthContext } from "../../context/authContext";

const RatingModal = ({ openRating, handleClose, setSuccessRate , hotelId}) => {
  const { user } = useContext(AuthContext);
  const [rate, setRate] = useState(0.0);
  const [feedback, setFeedback] = useState();
  const { apiCall, loading, error } = UseApi();
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

  const SubmitRate = async () => {
    try {
      const response = await apiCall({
        url: "/rating",
        method: "post",
        data: { feedback: feedback, rate: rate, userId: user.id , hotelId: hotelId},
      });
      setSuccessRate(true);
      if (response)
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      <Modal
        open={openRating}
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
              Add your Rate
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
          <Stack mt="1rem" mb="1rem" width="100%">
            <TextField
              required
              id="outlined-required1"
              label="Feedback"
              placeholder="Feedback"
              name="feedback"
              onChange={(e) => setFeedback(e.target.value)}
              value={feedback}
            />
            <span
              style={{
                width: "fitContent",
                margin: "1rem 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              Your rate:
              <Rating
                name="rate"
                value={rate}
                sx={{
                  ml: "0.5rem",
                }}
                precision={0.5}
                onChange={(e, newvalue) => setRate(newvalue)}
              />
            </span>
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
              onClick={SubmitRate}
              size="large"
              sx={{
                bgcolor: "#088395 !important",
              }}
            >
              Submit
            </Button>
          </span>
        </Box>
      </Modal>
    </>
  );
};

export default RatingModal;
