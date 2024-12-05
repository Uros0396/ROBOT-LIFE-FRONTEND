import "../Nav/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateToPrinterCategory = (category) => {
    navigate(`/Printer/${category}`);
    setShowMenu(false);
  };

  return (
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
          className="me-5 text-decoration-none cursor-pointer"
          onClick={() => navigateToPrinterCategory("3D Printer")}
        >
          <a className="text-unstyled" href="">
            3D Printer
          </a>
        </li>

        <Link to="/Contact Us" className="text-decoration-none">
          <li className="me-5">Contact Us</li>
        </Link>
        <Link to="/SignUp" className="text-decoration-none">
          <li className="me-5">Sign Up</li>
        </Link>
      </ul>

      <div className="logos d-flex justify-content-between align-items-center">
        <a className="me-2 text-decoration-none text-white" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </a>
        <a className="me-2 text-white" href="#">
          <i className="bi bi-person-fill-down"></i>
        </a>
        <a className="me-2 text-white" href="#">
          <i className="bi bi-handbag-fill"></i>
        </a>
        <a className="me-2 text-decoration-none text-white" href="#">
          <span>0.00 €</span>
        </a>
      </div>

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
            <Link to="/SignUp" className="text-decoration-none text-white">
              <li className="py-2">Sign Up</li>
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
    </nav>
  );
};

export default Navbar;
