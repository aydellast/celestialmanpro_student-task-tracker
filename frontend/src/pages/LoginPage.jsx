import {
  useState,
} from "react";

import {
  BsStars,
} from "react-icons/bs";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import logo from "../assets/logo.png";

import {
  loginUser,
} from "../services/authService";

import "../styles/auth.css";

function LoginPage() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await loginUser(
            email,
            password
          );

        console.log(
          "LOGIN RESPONSE:",
          response
        );

        localStorage.setItem(
          "token",
          response.token
        );

        localStorage.setItem(
          "username",
          response.user.username
        );

        localStorage.setItem(
          "email",
          response.user.email
        );

        console.log(
          "USERNAME:",
          localStorage.getItem(
            "username"
          )
        );

        console.log(
          "EMAIL:",
          localStorage.getItem(
            "email"
          )
        );

        alert(
          "Login berhasil"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Email atau password salah"
        );

      }
    };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-header">

          <img
            src={logo}
            alt="Logo"
            className="auth-logo"
          />

          <h1>
            Student Task Tracker
          </h1>

          <p>
            Turn Chaos Into Clarity
          </p>

          <p>
            by Celestial Team
          </p>

          <span className="auth-subtitle">
            <BsStars />
            Welcome back
          </span>

        </div>

        <form
          onSubmit={
            handleLogin
          }
          className="auth-form"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">

            Login

          </button>

        </form>

        <div className="auth-footer">

          <p>
            Belum punya akun?
          </p>

          <Link to="/register">
            Register sekarang
          </Link>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;