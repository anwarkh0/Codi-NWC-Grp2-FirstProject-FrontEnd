import React from "react";
import googleG from "../../assets/images/G.png";
import hidden from "../../assets/images/hidden.png";
import signupModule from "./signup.module.css";
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
            <img src={hidden} />
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
            <img src={hidden} />
          </span>
        </label>
        <button className={signupModule.signupBtn}>Sign Up</button>
        <p className={signupModule.query}>Already have an account?</p>
        <a href="#" className={signupModule.login}>
          Log in
        </a>
        <p className={signupModule.or}>Or</p>
        <button className={signupModule.gSign}>
          <span className={signupModule.glogo}>
            <img src={googleG} />
          </span>
          Sign up with Google
        </button>
      </form>
    </div>
  );
}

export default SignUp;
