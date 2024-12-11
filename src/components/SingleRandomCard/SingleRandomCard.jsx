import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../ReducerComponent/getProductsReducer";

const SingleRandomCard = () => {
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const randomProduct = useMemo(() => {
    return products.length > 0
      ? products[Math.floor(Math.random() * products.length)]
      : null;
  }, [products]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return randomProduct ? (
    <div className="container single-random-card">
      <div className="text-center mt-4 mb-4">
        <h3 className="text-warning">Daily Robot</h3>
      </div>
      <div className="row align-items-center justify-content-center  mt-3 pb-5">
        <div className="col-12 col-sm-8 col-md-6 text-center mb-4">
          <img
            src={randomProduct.image[0]}
            alt={randomProduct.title}
            className="random-card-img"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-12 col-sm-8 col-md-6 text-center">
          <h4 className="random-card-title text-warning">
            {randomProduct.title}
          </h4>
          <p className="random-card-category" style={{ color: "orange" }}>
            <span className="text-warning">Category:</span>{" "}
            {randomProduct.category || "Unknown"}
          </p>
          <p className="random-card-category" style={{ color: "orange" }}>
            <span className="text-warning">Description:</span>{" "}
            {randomProduct.description || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center">No products available.</p>
  );
};

export default SingleRandomCard;
