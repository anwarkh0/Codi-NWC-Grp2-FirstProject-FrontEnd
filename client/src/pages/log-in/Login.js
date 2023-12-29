import { React, useContext, useState } from "react";
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import loginModule from "./login.module.css";
import hidden from "../../assets/images/hidden.png";
import googleG from "../../assets/images/G.png";
import { Link, useNavigate } from "react-router-dom";
import UseApi from "../../hookes/useApi";
import { AuthContext } from "../../context/authContext";
import { Visibility, VisibilityOff } from '@mui/icons-material';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { apiCall, error, loading } = UseApi()
  const { fetchUserData } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      console.log("enter email and password")
    }
    try {
      await apiCall({ url: "/auth/login", method: "post", data: { email, password } })
      await fetchUserData()
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }
  const [isLoading, setIsloading] = useState(true);
  return (
    <div className={loginModule.wrapper}>
      <h1 className={loginModule.login}>Log in</h1>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography className={loginModule.query} >
          Don't have an account? <Link to="/signUp" className={loginModule.signup} >Sign up</Link>
        </Typography>
      </Stack>
      <form method="post" onSubmit={handleSubmit} className={loginModule.form}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            required
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#088395",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#088395"

              }, '& .MuiInputBase-root .MuiOutlinedInput-root .MuiInputBase-colorPrimary': {
                width: '20rem !important'
              },
            }}
          />
          <FormControl sx={{
            m: 1, '& .MuiSvgIcon-root': {
              color: "#088395",

            }, width: '25ch'
          }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
            <OutlinedInput
              onChange={(e) => { setPassword(e.target.value) }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    style={{ color: 'white' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>



        </Stack>
        <button onClick={handleSubmit} className={loginModule.signupBtn}>
          Log in
        </button>
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
