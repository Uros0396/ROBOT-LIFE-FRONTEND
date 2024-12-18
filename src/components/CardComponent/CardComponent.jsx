import { Link } from "react-router-dom";
import { useState } from "react";
import "../CardComponent/CardComponent.css";
import { Modal, Button } from "react-bootstrap";
import { isAuth } from "../../utils/isAuth";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";

const CardComponent = ({ filteredProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleMoreClick = (e) => {
    if (!isAuth()) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const truncateDescription = (description) => {
    if (!description) return "No description available";
    const words = description.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
  };

  if (!Array.isArray(filteredProducts) || filteredProducts.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <>
      {filteredProducts.map((product) => (
        <div className="card col-12 col-md-6 col-lg-4 mb-4" key={product._id}>
          <img
            className="img-card-top"
            src={
              product.image && product.image[0]
                ? product.image[0]
                : "default-image.jpg"
            }
            alt={product.title}
          />
          <div className="card-body">
            <h3 className="card-title">{product.title}</h3>
            <p className="card-text text-light">
              <strong className="text-warning">Category:</strong>{" "}
              {product.category}
            </p>
            <p className="card-text text-light">
              <strong className="text-warning">Description:</strong>{" "}
              {truncateDescription(product.description)}
              <Link
                to={`/Details/${product._id}`}
                className="text-decoration-none"
                style={{ color: "orange" }}
                onClick={handleMoreClick}
              >
                More
              </Link>
            </p>
            <p className="card-text text-light">
              <strong className="text-warning">Price:</strong> €{" "}
              {Number(
                product.price?.$numberDecimal || product.price || 0
              ).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title className="text-warning pb-0 pt-5">
            Access required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
          <div className="mt-0 d-flex justify-content-center align-items-center">
            <p className="text-warning me-2">Don't have an account?</p>
            <Button
              variant="link"
              className="text-decoration-none mb-3"
              onClick={() => {
                setShowModal(false);
                navigate("/SignUp");
              }}
            >
              Sign up
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardComponent;
