import "../Nav/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" d-flex justify-content-between align-items-center bg-black fixed-top">
      <div>
        <img
          className="imgLogo"
          src="https://res.cloudinary.com/dhoq8vx2k/image/upload/v1732957705/ROBOTLIFE/DALL%C3%82%C2%B7E%202024-11-30%2010.webp"
          alt="logo-RobotLife"
        />
      </div>

      <ul className="mt-3 d-flex justify-content-between align-items-center list-unstyled">
        <Link to="/Categories" className="text-decoration-none">
          <li className="me-5">Categories</li>
        </Link>
        <Link to="/Printer" className="text-decoration-none">
          <li className="me-5">3D Printer</li>
        </Link>
        <Link to="/Contact Us" className="text-decoration-none">
          <li className="me-5">Contact Us</li>
        </Link>

        <Link to="/SignUp" className="text-decoration-none">
          <li className="me-5">Sign Up</li>
        </Link>
      </ul>

      <div className="logos d-flex justify-content-between align-items-center">
        <a className="me-2 text-decoration-none" href="#">
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
        <a className="me-2" href="#">
          <i className="bi bi-person-fill-down"></i>
        </a>
        <a className="me-2" href="#">
          <i className="bi bi-handbag-fill"></i>
        </a>
        <a className="me-2 text-decoration-none" href="#">
          <span>0.00 €</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
