import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4600/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("Authorization", JSON.stringify(data.token));
        navigate("/Homepage");
      } else {
        alert(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Try again.");
    }
  };

  const redirectToGoogle = () => {
    window.location.href = "http://localhost:4600/auth/google";
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
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
        <button type="submit">Login</button>
        <button onClick={redirectToGoogle}>Sign with google</button>
      </form>
    </div>
  );
};

export default Login;
