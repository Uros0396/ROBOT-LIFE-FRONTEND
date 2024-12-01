import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isProductLoading,
  errorProduct,
  getAllProducts,
  allProducts,
} from "../../ReducerComponent/getProductsReducer";
import "../CardComponent/CardComponent.css";

const CardComponent = () => {
  const dispatch = useDispatch();

  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const truncateDescription = (description) => {
    if (!description) return "No description available";
    const words = description.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
  };

  return (
    <>
      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products &&
        products.map((product) => (
          <div
            className="card col-12 col-md-6 col-lg-4 mb-4"
            key={product.asin}
          >
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
                <a
                  className="text-decoration-none"
                  href={`/Details/${product.asin}`}
                  style={{ color: "orange" }}
                >
                  Click Here
                </a>
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
