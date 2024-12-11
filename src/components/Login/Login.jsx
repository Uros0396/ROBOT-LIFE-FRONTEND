{
  /*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
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
        navigate("/");
      } else {
        alert(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Try again.");
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
        />
        <button className="text-warning bg-dark mt-4" type="submit">
          Login
        </button>
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
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ closeModal }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
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
        closeModal(); // Chiudi il modale
        navigate("/");
      } else {
        alert(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Try again.");
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
        />
        <button className="text-warning bg-dark mt-4" type="submit">
          Login
        </button>
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
