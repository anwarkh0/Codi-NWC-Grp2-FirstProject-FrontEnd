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

const UserModal = ({
  type,
  selectedRowData,
  open,
  handleClose,
  handleEditClose,
  setSuccessAdd,
  setSuccessEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (type === "edit" && selectedRowData) {
      setFirstName(selectedRowData.firstName);
      setLastName(selectedRowData.lastName);
      setImage(selectedRowData.image);
      setPassword(selectedRowData.password);
      setRole(selectedRowData.role);
      setEmail(selectedRowData.email);
      const dobValue = dayjs(selectedRowData.dob);
      setDob(dobValue);
    }
  }, [type, selectedRowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImage(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "dob") {
      setDob(value);
    } else if (name === "role") {
      setRole(value);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
  };

  const handleFromClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setImage("");
    setRole("");
    setPassword("");
    setFirstName("");
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
              }, "& .MuiInputLabel-root.Mui-focused": {
                color: "#088395",
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
                  Add User
                </Typography>
              ) : (
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
                  Edit User
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
                  label="FirstName"
                  placeholder="FirstName"
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                />
                <TextField
                  required
                  id="outlined-required2"
                  label="LastName"
                  placeholder="LastName"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
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
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={role}
                    name="role"
                    label="Role *"
                    onChange={handleChange}
                  >
                    <MenuItem disabled>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Customer"}>Customer</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password1"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{ color: "white" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                  />
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Date of Birth" value={dob} onChange={setDob} />
                  </DemoContainer>
                </LocalizationProvider>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                />
                <div style={divStyle}>
                  <span
                    onClick={type === "add" ? handleAddUser : handleEditUser}
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
export default UserModal;
