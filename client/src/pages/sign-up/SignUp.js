import React from "react";
import googleG from "../../assets/images/G.png";
import hidden from "../../assets/images/hidden.png";
import signupModule from "./signup.module.css";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className={signupModule.wrapper}>
      <h1 className={signupModule.signup}>Sign up</h1>
      <h1 className={signupModule.welcome}>Welcome to HotelXpress</h1>
      <form method="POST" className={signupModule.form}>
        <label className={signupModule.inpLabel}>
          Email
          <input
            className={signupModule.inp}
            placeholder="Enter your email"
            type="email"
          />
        </label>
        <label className={signupModule.inpLabel}>
          Create Password
          <input
            className={signupModule.inp}
            placeholder="Enter your password"
            type="password"
          />
          <span className={signupModule.hidden}>
            <img alt="hidden eye" src={hidden} />
          </span>
        </label>
        <label className={signupModule.inpLabel}>
          Confirm Password
          <input
            className={signupModule.inp}
            placeholder="Enter your password"
            type="password"
          />
          <span className={signupModule.hidden}>
            <img alt="hidden eye" src={hidden} />
          </span>
        </label>
        <Link to="/" className={signupModule.signupBtn}>
          Sign Up
        </Link>
        <p className={signupModule.query}>Already have an account?</p>
        <Link to="login" className={signupModule.login}>
          Log in
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
