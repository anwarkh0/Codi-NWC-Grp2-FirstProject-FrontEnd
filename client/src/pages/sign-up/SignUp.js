import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import googleG from "../../assets/images/G.png";
import hidden from "../../assets/images/hidden.png";
import signupModule from "./signup.module.css";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className={signupModule.wrapper}>
      {/* <h1 className={signupModule.signup}>Sign up</h1> */}
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
  );
}

export default SignUp;
