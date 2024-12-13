import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import "../Nav/Navbar.css";

const Navbar = ({ setSearchResult }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTitle.trim()) {
      alert("Please enter a valid title");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products/title/${searchTitle}`
      );
      const data = await response.json();

      if (response.ok) {
        const products = Array.isArray(data.products)
          ? data.products
          : [data.product];
        setSearchResult(products);
      } else {
        alert(data.message || "Product not found");
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error occurred while searching");
      setSearchResult([]);
    }
  };

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleLoginModal = () => setShowLoginModal(!showLoginModal);

  const navigateToPrinterCategory = (category) => {
    navigate(`/Printer/${category}`);
    setShowMenu(false);
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
    alert("Logged out successfully.");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar d-flex justify-content-between align-items-center bg-black fixed-top px-3">
        <div>
          <Link to="/">
            <img
              className="imgLogo"
              src="https://res.cloudinary.com/dhoq8vx2k/image/upload/v1732957705/ROBOTLIFE/DALL%C3%82%C2%B7E%202024-11-30%2010.webp"
              alt="logo-RobotLife"
            />
          </Link>
        </div>

        <button
          className="navbar-toggler d-lg-none text-white"
          type="button"
          onClick={toggleMenu}
        >
          <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
        </button>

        <ul className="mt-3 d-none d-lg-flex justify-content-between align-items-center list-unstyled">
          <Link to="/Categories" className="text-decoration-none">
            <li className="me-5">Categories</li>
          </Link>
          <li
            className="me-5 cursor-pointer"
            onClick={() => navigateToPrinterCategory("3D Printer")}
          >
            <a href="#" className="text-decoration-none">
              3D Printer
            </a>
          </li>
          <Link to="/Contact Us" className="text-decoration-none">
            <li className="me-5">Contact Us</li>
          </Link>
        </ul>

        <div className="logos d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-light me-2 border-0 bg-black"
            onClick={toggleLoginModal}
          >
            <span className="text-warning">Login</span>
          </button>

          {location.pathname === "/" && (
            <div className="d-flex align-items-center">
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Search"
                className="form-control me-2"
              />
              <button onClick={handleSearch} className="btn btn-outline-info">
                Search
              </button>
            </div>
          )}

          <a href="#" className="me-2 text-white" onClick={logout}>
            <i className="bi bi-person-fill-down"></i>
          </a>
          <Link to="/Cart" className="me-2 text-white">
            <i className="bi bi-handbag-fill"></i>
          </Link>
        </div>
      </nav>

      {showLoginModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content modal-login">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleLoginModal}
                ></button>
              </div>
              <div className="modal-body">
                <Login closeModal={toggleLoginModal} />
                <Link to="/SignUp" className="text-decoration-none text-white">
                  <li className="py-2 list-unstyled text-warning">Sign Up</li>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMenu && (
        <div className="offcanvas-menu bg-black text-white d-lg-none">
          <ul className="list-unstyled text-center mt-3">
            <Link to="/Categories" className="text-decoration-none text-white">
              <li className="py-2">Categories</li>
            </Link>
            <li
              className="py-2 text-decoration-none cursor-pointer"
              onClick={() => navigateToPrinterCategory("Accessories")}
            >
              3D Printer
            </li>
            <Link to="/Contact Us" className="text-decoration-none text-white">
              <li className="py-2">Contact Us</li>
            </Link>
          </ul>
          <button
            className="btn-close text-white mt-2 ms-auto me-3"
            onClick={toggleMenu}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
