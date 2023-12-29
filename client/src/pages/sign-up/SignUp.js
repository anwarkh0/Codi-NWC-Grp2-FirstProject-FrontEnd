import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';


import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import googleG from "../../assets/images/G.png";
import hidden from "../../assets/images/hidden.png";
import signupModule from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UseApi from "../../hookes/useApi";
function SignUp() {


  const { apiCall } = UseApi()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    image: ""
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.lastName || !formData.firstName || !formData.email || !formData.password) {
      console.log("this feild is required")
    }
    if (formData.password !== formData.confirmPassword) {
      console.log("Password confirmed incorrectly")
    }
    try {
      await apiCall({ url: "/auth/signup", method: "post", data: formData })

      navigate("/")
    } catch (error) {
      console.log(error)

    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <div className={signupModule.wrapper}>

      <h1 className={signupModule.welcome}>Sign up</h1>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography className={signupModule.query} >
          Already have an account? <Link to="login" className={signupModule.login} >Log in</Link>

        </Typography>
      </Stack>
      <form >

        
        <Stack spacing={3}>
        <TextField
            fullWidth
            type="file"
            label="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
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
            label="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
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
            label="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
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
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            type="password"
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
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
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
        <button
          onClick={handleSubmit}
          className={signupModule.signupBtn}
        >
          Sign Up
        </button>
        <p className={signupModule.or}>Or</p>
        <Link to="/" className={signupModule.gSign}>
          <span className={signupModule.glogo}>
            <img alt="gsign" src={googleG} />
          </span>
          Sign up with Google
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
