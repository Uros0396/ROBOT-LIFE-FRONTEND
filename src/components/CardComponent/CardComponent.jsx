import { Link } from "react-router-dom";
import "../CardComponent/CardComponent.css";

const CardComponent = ({ filteredProducts }) => {
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
        <div className="card col-12 col-md-6 col-lg-4 mb-4" key={product.asin}>
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
    </>
  );
};

export default CardComponent;
