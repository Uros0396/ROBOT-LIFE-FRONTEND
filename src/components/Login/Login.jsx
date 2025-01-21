/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ closeModal = () => {} }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("Authorization", data.token);
        closeModal();
        navigate("/");
        Swal.fire({
          title: data.message || "Login Successfully",
          icon: "success",
          background: "#1a1a1a",
          color: "gold",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      } else {
        Swal.fire({
          title: data.message || "Error Login",
          icon: "warning",
          background: "#1a1a1a",
          color: "gold",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  return (
    <div className="mt-0 pt-0">
      <form
        className="d-flex flex-column justify-content-center align-items-center gap-2"
        onSubmit={onSubmit}
      >
        <input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          autoComplete="email"
          required
        />
        <input
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          name="password"
          type="password"
          value={formData.password}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button className="text-warning bg-dark" type="submit">
          Login
        </button>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <button
          className="text-warning bg-dark"
          type="button"
          onClick={redirectToGoogle}
        >
          Sign with Google
        </button>
      </form>
    </div>
  );
};

export default Login;*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ closeModal = () => {} }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("Authorization", data.token);
        closeModal();
        navigate("/");
        Swal.fire({
          title: data.message || "Login Successful",
          icon: "success",
          background: "#1a1a1a",
          color: "gold",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      } else {
        setErrorMessage(data.message || "Login failed");
        Swal.fire({
          title: data.message || "Error Login",
          icon: "warning",
          background: "#1a1a1a",
          color: "gold",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  /*const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };*/

  const redirectToGoogle = () => {
    const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
    const redirectURL = "https://robot-life-frontend.vercel.app/success";

    window.location.href = `${baseURL}/auth/google?redirect_uri=${encodeURIComponent(
      redirectURL
    )}`;
  };

  return (
    <div className="mt-0 pt-0">
      <form
        className="d-flex flex-column justify-content-center align-items-center gap-2"
        onSubmit={onSubmit}
      >
        <input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          autoComplete="email"
          required
        />
        <input
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          name="password"
          type="password"
          value={formData.password}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button className="text-warning bg-dark" type="submit">
          Login
        </button>
        {errorMessage && (
          <div className="alert alert-danger mt-2">{errorMessage}</div>
        )}
        <button
          className="text-warning bg-dark"
          type="button"
          onClick={redirectToGoogle}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
