import {
  useState,
} from "react";

import {
  BsRocketTakeoff,
} from "react-icons/bs";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import logo from "../assets/logo.png";

import {
  registerUser,
} from "../services/authService";

import "../styles/auth.css";

function RegisterPage() {

  const navigate =
    useNavigate();

  const [username,
    setUsername] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        await registerUser(
          username,
          email,
          password
        );

        alert(
          "Register berhasil 🚀"
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(
          "Register gagal"
        );

      }
    };

  return (

    <div className="auth-container">

      <div className="auth-card">

        {/* HEADER */}

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
            <BsRocketTakeoff />
            Create your account
          </span>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleRegister
          }

          className="auth-form"
        >

          <input
            type="text"

            placeholder="Username"

            value={username}

            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }

            required
          />

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

            Register

          </button>

        </form>

        {/* FOOTER */}

        <div className="auth-footer">

          <p>
            Sudah punya akun?
          </p>

          <Link to="/login">
            Login sekarang
          </Link>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;