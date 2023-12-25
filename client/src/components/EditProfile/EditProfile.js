import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton'

const EditProfile = ({ userData, setSuccessEdit }) => {
  const [fullName, setfullName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(screenWidth < 900 ? "column" : "row");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      setDisplay(newWidth < 900 ? "column" : "row");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setfullName(userData.fullName);
    setImage(userData.image);
    setPassword(userData.password);
    setRole(userData.role);
    setEmail(userData.email);
    const dobValue = dayjs(userData.dob);
    setDob(dobValue);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImage(value);
    } else if (name === "fullName") {
      setfullName(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        width: '100%',
        padding: screenWidth < 380 ? '10px' : "2rem",
        mb: "5rem",
        borderRadius: "10px",
        boxShadow: '1px 1px 5px 5px #BABABA' ,
        "& .MuiFormControl-root": {
          mt: 2,
          mb: 2,
          ml: 0,
          mr: 0,
          width:screenWidth < 380 ? "10rem" :  screenWidth < 550 ? "15rem" : "20rem",
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
          color: "white",
        },
        "& .MuiButton-containedPrimary": {
          bgcolor: "#088395 !important",
          padding: 0,
          mt: 2,
          mb: 2,
          height: "3.5rem",
          width: screenWidth < 550 ? "15rem" : "20rem",
        },
        "& .MuiButton-containedPrimary:hover": {
          bgcolor: "#035e6b !important",
        },
        "& .MuiStack-root": {
          padding: 0,
          margin: 0,
        },
        "& .MuiButtonBase-root": {
          borderRadius: 0,
          bgcolor: "#088395",
          padding: "15px",
        },
        "& .MuiButtonBase-root:hover": {
          bgcolor: "#17456E",
        },
        "& .MuiOutlinedInput-notchedOutline ": {
          border: "1.5px solid #088395 !important",
          borderRadius: "4px",
        },
        "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
          border: "1.5px solid #088395 !important",
          borderRadius: "4px",
        },
        '& .Mui-focused > .MuiOutlinedInput-notchedOutline > fieldset > legend':{
          color : '#088395 !important'
        },
        '& .MuiStack-root ':{
          width : screenWidth < 380 ? '10rem' : screenWidth < 500 ? '15rem' : '20rem',
          margin : screenWidth < 900 ? 0 : screenWidth < 1100 ?'0 3rem' : '0 5rem' ,
          alignItems: screenWidth < 550 ? 'center' : ''
        },
        '& .MuiFormControl-root , & .MuiTextField-root , & .MuiInputBase-root' :{
          width : screenWidth < 380 ? '10rem' : screenWidth < 500 ? '15rem' : '20rem',
          minWidth: '0 !important'
        }
      }}
      autoComplete="off"
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Stack
            flexDirection={display}
            sx={{
              justifyContent: screenWidth > 900 ? "space-around" : "center",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              <TextField
                required
                id="outlined-required1"
                label="FullName"
                placeholder="FullName"
                name="fullName"
                onChange={handleChange}
                value={fullName}
              />
              <TextField
                required
                id="outlined-required3"
                label="Email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={email}
              />
              <FormControl
                required
                disabled
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
                  label="Role *"
                  name="role"
                  onChange={handleChange}
                >
                  <MenuItem disabled>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Acountant"}>User</MenuItem>
                </Select>
              </FormControl>
              {screenWidth > 900 ? (
                <>
                  <span
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      width: "100%",
                      display: "flex",
                      justifyContent:
                        screenWidth > 900 ? "flex-start" : "center",
                    }}
                  >
                    <Button variant="contained" color="primary" size="large" type="submit" startIcon={<EditIcon/>} >Submit</Button>
                  </span>
                </>
              ) : (
                ""
              )}
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={dob}
                    name="dob"
                    onChange={setDob}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
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
                  value={password}
                  disabled
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  confirm*
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
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
              <FormControl>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                style={{
                  width: screenWidth < 380 ? '10rem' : screenWidth < 550 ? '15rem' : '20rem',
                }}
              />
              </FormControl>
            </Stack>
            {screenWidth < 900 ? (
              <>
                <span
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: screenWidth > 900 ? "flex-start" : "center",
                  }}
                >{
                  loading ? (
                    <LoadingButton loading variant="contained"/>
                  ):(
                    <Button variant="contained" type="submit" color="primary" size="large" startIcon={<EditIcon/>}>Submit</Button>
                  )
                }
                </span>
              </>
            ) : (
              ""
            )}
          </Stack>
        </form>
      )}
    </Box>
  );
};
export default EditProfile;
