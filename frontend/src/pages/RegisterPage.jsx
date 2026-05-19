// ========================================
// FILE: src/pages/RegisterPage.jsx
// ========================================

import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  registerUser,
} from "../services/authService";

function RegisterPage() {
  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
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
          "Register berhasil"
        );

        navigate("/");
      } catch (error) {
        alert("Register gagal");
      }
    };

  return (
    <div className="container">
      <h1>Register</h1>

      <form
        onSubmit={handleRegister}
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
        />

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Sudah punya akun?
        <Link to="/">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;