import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import "../Details/Details.css";
import StarRating from "./StarRating/StarRating";
import CommentForm from "../../components/CommentForm/CommentForm";
import useSession from "../../hooks/useSession";

const Details = () => {
  const { productId } = useParams();
  const sessionData = useSession();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [error, setError] = useState(null);

  const getProductDetails = async () => {
    if (!productId) {
      console.error("Product ID is not defined.");
      setError("Product not found or invalid.");
      return;
    }

    setLoading(true);
    try {
      const responseProduct = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products/${productId}`
      );

      if (!responseProduct.ok) {
        throw new Error("Failed to fetch product details");
      }

      const productData = await responseProduct.json();
      setProductDetails(productData.product);
      setError(null);

      const responseComments = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/comment/${productId}`
      );

      if (!responseComments.ok) {
        throw new Error("Failed to fetch product comments");
      }

      const commentsData = await responseComments.json();
      setComments(commentsData.comments || []);
    } catch (error) {
      console.error("Error fetching product details or comments:", error);
      setError("Error fetching product details or comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  useEffect(() => {
    if (
      productDetails &&
      productDetails.image &&
      productDetails.image.length > 0
    ) {
      setMainImage(productDetails.image[0]);
    }
  }, [productDetails]);

  const handleNewComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productDetails) {
    return <div>No product details available.</div>;
  }

  const price = productDetails.price?.$numberDecimal || productDetails.price;

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-details bg-dark">
        <div className="row">
          <div className="col col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-warning">{productDetails.title}</h2>

            <img
              src={
                mainImage ||
                "https://via.placeholder.com/500?text=No+Image+Available"
              }
              alt="Main Product"
              style={{
                width: "600px",
                height: "400px",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />
          </div>

          <div className="col col-md-6 pt-5 col-lg-6">
            <p className="text-warning">
              Description:{" "}
              <span className="product-text">{productDetails.description}</span>
            </p>

            <p className="text-warning pb-3">
              Price: <span className="product-text">€ {price}</span>
            </p>

            <hr className="text-warning" />

            <div className="pt-3 pb-3">
              {comments.length > 0 ? (
                <ul className="ps-0">
                  {comments.map((comment) => (
                    <li className="" key={comment._id}>
                      <p className="text-warning me-5 pe-5">
                        Comments:{" "}
                        <span className="product-text">{comment.comment}</span>
                      </p>
                      <p className="text-warning">Rate:</p>
                      <div className="product-text">
                        <StarRating rate={comment.rate} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="product-text">No comments found.</p>
              )}
            </div>

            <hr className="text-warning" />

            <div className="pt-3 d-flex flex-column justify-content-center align-items-center div-add-review">
              <h4 className="text-warning">Add Your Reviews:</h4>
              {sessionData ? (
                <CommentForm
                  productId={productId}
                  userId={sessionData._id}
                  onCommentSubmit={handleNewComment}
                />
              ) : (
                <p className="text-danger">
                  Devi essere loggato per aggiungere un commento.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;
