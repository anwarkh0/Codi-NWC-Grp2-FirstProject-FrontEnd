import { React, useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import loginModule from "./login.module.css";
import hidden from "../../assets/images/hidden.png";
import googleG from "../../assets/images/G.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userData);
  };

  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      // console.log('fetch')
      try {
        const response = await axios.post("http://localhost:8000/user/login");
        if (response) {
          setUserData(response.data);
          setIsloading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={loginModule.wrapper}>
      <h1 className={loginModule.login}>Log in</h1>
      {/* <h1 className={loginModule.header}>Welcome back to HotelXpress</h1> */}
        <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography className={loginModule.query} >
              Don't have an account? <Link to="/signUp" className={loginModule.signup} >Sign up</Link>
              </Typography>
            </Stack>
      <form method="post" onSubmit={handleSubmit} className={loginModule.form}>
      <Stack spacing={3}>
      <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  // value={formData.email}
                  // onChange={handleInputChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#088395",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#088395",
                    },
                  }}
                />
        <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  // value={formData.email}
                  // onChange={handleInputChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#088395",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#088395",
                    },
                  }}
                />
                </Stack>
        {/* <fieldset className={loginModule.rememberfield}>
          <label className={loginModule.remember}>
            <input type="checkbox" className={loginModule.checkme} />
            <p className={loginModule.remembermetxt}>Remember me</p>
          </label>
          <a href="#" className={loginModule.frgtpass}>
            Forgot password?
          </a>
        </fieldset> */}
        <Link to="/" className={loginModule.signupBtn}>
          Log in
        </Link>
        <p className={loginModule.or}>Or</p>
        <Link to="/" className={loginModule.gSign}>
          <span className={loginModule.glogo}>
            <img src={googleG} />
          </span>
          Log in with Google
        </Link>
      </form>
    </div>
  );
}

export default Login;
