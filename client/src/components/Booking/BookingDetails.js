import { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  IconButton,
  Button ,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton'
import customParseFormat from "dayjs/plugin/customParseFormat";
import UseApi from "../../hookes/useApi";
import { AuthContext } from "../../context/authContext";

dayjs.extend(customParseFormat);

const ReservationModal = ({
  roomId ,
  open,
  handleClose,
  roomData,
  setSuccessReserve
}) => {
  const {user} = useContext(AuthContext)
  const {loading , error ,apiCall } = UseApi()
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    // Extract reserved dates from roomData and set them to reservedDates state
    const allReservedDates = roomData?.Reservations?.flatMap((reservation) => {
      const checkInDate = new Date(reservation.checkInDate);
      const checkOutDate = new Date(reservation.checkOutDate);

      // Generate an array of dates between check-in and check-out dates
      const datesBetween = [];
      while (checkInDate <= checkOutDate) {
        datesBetween.push(new Date(checkInDate));
        checkInDate.setDate(checkInDate.getDate() + 1);
      }

      return datesBetween;
    });

    setReservedDates(allReservedDates || []);
  }, [roomData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
     await apiCall({
      method: 'post',
      url: 'reservation', 
      data : {
        roomId : roomId ,
        userId : user.id , 
        checkInDate : startDate ,
        checkOutDate : endDate
      }
    })
    setSuccessReserve(true)
    handleClose()
    setTimeout(()=>{
      setSuccessReserve(false)
    },20000)
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
        onClose={handleClose}
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
              }, "& .MuiInputLabel-root.Mui-focused": {
                color: "#088395",
              },
            }}
            autoComplete="off"
          >
            <div style={divStyle}>
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
                  Reserve this room
                </Typography>
              <IconButton
                style={spanStyle}
                onClick={() => {
                  handleClose();
                  
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <form onSubmit={handleSubmit}>
              <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Start Date" value={startDate} onChange={setStartDate} disablePast={true} shouldDisableDate={(day) => reservedDates &&  reservedDates.some(d => dayjs(d).isSame(day, 'day'))}/>
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="End Date" value={endDate} onChange={setEndDate}disablePast={true} shouldDisableDate={(day) => reservedDates &&  reservedDates.some(d => dayjs(d).isSame(day, 'day'))}/>
                  </DemoContainer>
                </LocalizationProvider>
                <div style={divStyle}>
                  <span
                    onClick={handleSubmit}
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
export default ReservationModal;
