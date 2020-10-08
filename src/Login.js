import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => history.push("/"))
      .catch((err) => alert(err.message));
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form action="">
          <label for="email">E-mail</label>
          <input
            type="email"
            placeholder=""
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="lassword"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the Amazon Fake Clone Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
