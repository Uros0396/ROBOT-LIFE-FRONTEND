import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  return (
    <div>
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
        <button className="text-warning bg-dark mt-4" type="submit">
          Login
        </button>
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
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

export default Login;
