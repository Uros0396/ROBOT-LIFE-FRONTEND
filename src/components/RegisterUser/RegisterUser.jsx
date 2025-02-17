import { useState } from "react";
import { User, Mail, Lock, ChevronDown } from "lucide-react";
import "../RegisterUser/RegisterUser.css";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../Modals/SuccesRegisterModal/SuccesRegModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error] = useState(null);
  const [success] = useState(false);
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

      setModalMessage("User created successfully!");
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/");
      }, 2000);

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
      setModalMessage(`Error: ${err.message}`);
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
      }, 6000);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="row">
        <div className="col col-md-3 col-lg-3 d-flex justify-content-between align-items-center">
          <div className="signup-form">
            <h2>SIGN UP</h2>

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
                  className="bg-dark"
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
              <div className="form-group me-5 pe-5">
                <label htmlFor="role">
                  <ChevronDown size={20} />
                </label>
                <select
                  className="bg-dark text-warning"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                </select>
              </div>
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-3 col-lg-3  term-condition">
          <h6 className="text-warning">Terms and Conditions</h6>
          <p>
            Welcome to RobotLife. By using our website and purchasing our
            robotic products, you agree to these terms and conditions. All
            products are subject to availability and may vary in specifications.
            Payments must be made in full before shipment. We are not liable for
            any damages caused by misuse of our products. Customers have 14 days
            to request returns or refunds for defective items. Shipping fees are
            non-refundable. Warranty claims must adhere to the provided
            guidelines. These terms are governed by Austrian laws.
          </p>
          <p>
            Contact us at{" "}
            <a className="text-unstyled" href="">
              robotlife@gmail.com
            </a>{" "}
            for any inquiries.
          </p>
          <p>Thank you for choosing us!</p>
        </div>
        <div className="col col-md-6 col-lg-6"></div>
      </div>
    </>
  );
};

export default RegisterUser;
