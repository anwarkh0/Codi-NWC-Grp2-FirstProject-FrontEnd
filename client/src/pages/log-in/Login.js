import { React, useContext, useEffect, useState } from "react";
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import UseApi from "../../hookes/useApi";
import { AuthContext } from "../../context/authContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import video from "../../assets/Login.mp4";
import OAuth from "../../components/OAuth/OAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [screenWidth, setScreenWidth] = useState();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { apiCall, error, loading } = UseApi();
  const { fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      console.log("enter email and password");
    }
    try {
      const response = await apiCall({
        url: "/auth/login",
        method: "post",
        data: { email, password },
      });
      await fetchUserData();
      if (response.status === 200) navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <div
      style={{
        display: "flex",
        margin: screenWidth < 500 ? 0 : screenWidth < 1000 ? "5rem 0" : 0,
        flexDirection: screenWidth < 1000 ? "column-reverse" : "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Helmet>
        <title>Hotel Xpress - Login</title>
        <meta
          name="description"
          content="Login to your account at Hotel Xpress."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hotel Xpress - Login" />
        <meta
          property="og:description"
          content="Login to your account at Hotel Xpress."
        />
      </Helmet>
      <Box
        sx={{
          display: screenWidth < 500 ? "none" : "flex",
        }}
      >
        <video id="vid" width="100%" autoPlay muted>
          {" "}
          <source src={video} type="video/mp4" />
          Your Browser does not support this video tag.
        </video>
      </Box>
      <Box
        sx={{
          width:
            screenWidth < 300 ? "200px" : screenWidth < 520 ? "300px" : "400px",
          "& .MuiFormControl-root": {
            mt: 2,
            mb: 2,
            ml: 0,
            mr: 0,
          },
          "& .MuiInputBase-root": {
            color: "black",
          },
          "& .MuiFormLabel-root ": {
            color: "black",
          },
          "& .MuiBox-root css-3b5rqz": {
            margin: "2rem !important",
          },
          "& .MuiSvgIcon-root": {
            color: "#088395",
          },
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "1.5px solid #088395 !important",
            borderRadius: "4px",
          },
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline > legend": {
            color: "#088395 !important",
          },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "#088395",
          },
          "& .MuiButtonBase-root": {
            height: "3rem !important",
          },
        }}
      >
        <Typography component="h4" variant="h4" fontWeight="bold" mb="1rem">
          Login to you account
        </Typography>
        <Stack flexDirection={screenWidth < 300 ? "column" : "row"} spacing={1}>
          <Typography variant="h6" component="h6">
            Don't have an account?
          </Typography>
          <Link
            to="/signUp"
            style={{
              width: "fit-content",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="p"
              component="p"
              width="fit-content"
              color="#088395"
              ml="0.5rem"
            >
              Sign up
            </Typography>
          </Link>
        </Stack>
        <form
          method="post"
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack spacing={3} mb="1.5rem" mt="1.5rem">
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <FormControl
              fullWidth
              sx={{
                m: 1,
                "& .MuiSvgIcon-root": {
                  color: "#088395",
                },
                width: "100%",
                "&:focus": {
                  borderColor: "#088395",
                },
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password*
              </InputLabel>
              <OutlinedInput
                fullWidth
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
              />
            </FormControl>
          </Stack>
          {loading ? (
            <LoadingButton variant="contained" size="large" loading>
              Loading
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#088395",
                ":hover": {
                  bgcolor: "#035e6b",
                },
              }}
            >
              Log in
            </Button>
          )}
          <p
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Or
          </p>
          <OAuth />
        </form>
      </Box>
    </div>
  );
};

export default Login;
