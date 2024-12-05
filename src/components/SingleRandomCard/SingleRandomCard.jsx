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
    <div className="single-random-card container">
      <div className="row">
        <div className="col text-center">
          <h3 className="random-card-title">{randomProduct.name}</h3>
          <img
            src={randomProduct.image[0]}
            alt={randomProduct.name}
            className="random-card-img"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <p className="random-card-category text-warning">
            Category: {randomProduct.category || "Unknown"}
          </p>
          <p className="random-card-price text-warning">
            Price: $
            {parseFloat(
              randomProduct.price?.$numberDecimal || randomProduct.price || 0
            ).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <p>No products available.</p>
  );
};

export default SingleRandomCard;
