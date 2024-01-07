import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Links from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import googleG from "../../assets/images/G.png";
import hidden from "../../assets/images/hidden.png";
import { Helmet } from "react-helmet-async";
import signupModule from "./signup.module.css";
import { useState } from "react";
import UseApi from "../../hookes/useApi";






const defaultTheme = createTheme();

export default function SignUp() {
  const { apiCall } = UseApi()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    // image: ""
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
      await apiCall({ url: "/auth/singup", method: "post", data: formData })

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
<<<<<<< HEAD
    <div className={signupModule.wrapper}>
      <Helmet>
        <title>Hotel Xpress - Sign Up</title>
        <meta
          name="description"
          content="Sign up to your account at Hotel Xpress."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hotel Xpress - Sign up" />
        <meta
          property="og:description"
          content="Sign up to your account at Hotel Xpress."
        />
      </Helmet>
      <h1 className={signupModule.welcome}>Sign up</h1>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography className={signupModule.query}>
          Already have an account?{" "}
          <Link to="/login" className={signupModule.login}>
            Log in
          </Link>
        </Typography>
      </Stack>
      <form>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullname"
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
            // value={formData.password}
            // onChange={handleInputChange}
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
            name="confirm"
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
        <Link to="/" className={signupModule.signupBtn}>
          Sign Up
        </Link>
        <p className={signupModule.or}>Or</p>
        <Link to="/" className={signupModule.gSign}>
          <span className={signupModule.glogo}>
            <img alt="gsign" src={googleG} />
          </span>
          Sign up with Google
        </Link>
      </form>
    </div>
=======
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  autoComplete="role"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
>>>>>>> anwar-style
  );
}
