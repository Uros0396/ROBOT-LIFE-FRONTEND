import { useState } from "react";
import { User, Mail, Lock, ChevronDown } from "lucide-react";

import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    dob: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create user");
      }

      setSuccess(true);
      setError(null);

      setTimeout(() => {
        navigate("/");
      }, 1500);

      setFormData({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        role: "user",
        dob: "",
      });
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form">
        <h2>SIGN UP</h2>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">User created successfully!</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <User size={20} />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">
              <User size={20} />
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
              required
              minLength="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">
              <User size={20} />
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">
              <User size={20} />
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              placeholder="Dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">
              <ChevronDown size={20} />
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="company">Company</option>
            </select>
          </div>
          <button type="submit" className="signup-button">
            Sign up
          </button>
          <p>
            By creating an account, you agree to our
            <span className="terms-link">Terms & Conditions</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
