// ========================================
// FILE: src/pages/LoginPage.jsx
// ========================================

import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
} from "../services/authService";

function LoginPage() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    try {
      const response =
        await loginUser(
          email,
          password
        );

      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Login gagal");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>

      <p>
        Belum punya akun?
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;