import { React, useEffect, useState } from "react";
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
      <h1 className={loginModule.header}>Welcome to HotelXpress</h1>
      <form method="post" onSubmit={handleSubmit} className={loginModule.form}>
        <label className={loginModule.inpLabel}>
          Email
          <input
            className={loginModule.inp}
            placeholder="Enter your email"
            type="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <label className={loginModule.inpLabel}>
          Password
          <input
            className={loginModule.inp}
            placeholder="Enter your password"
            type="password"
            value={userData.password}
            onChange={handleChange}
          />
          <span className={loginModule.hidden}>
            <img src={hidden} />
          </span>
        </label>
        <fieldset className={loginModule.rememberfield}>
          <label className={loginModule.remember}>
            <input type="checkbox" className={loginModule.checkme} />
            <p className={loginModule.remembermetxt}>Remember me</p>
          </label>
          <a href="#" className={loginModule.frgtpass}>
            Forgot password?
          </a>
        </fieldset>
        <button type="submit" className={loginModule.signupBtn}>
          Log in
        </button>
        <p className={loginModule.query}>Don't have an account?</p>
        <a href="#" className={loginModule.signup}>
          Sign up
        </a>
        <p className={loginModule.or}>Or</p>
        <button className={loginModule.gSign} type="submit">
          <span className={loginModule.glogo}>
            <img src={googleG} />
          </span>
          Log in with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
