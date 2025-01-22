import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import "../Details/Details.css";
import StarRating from "./StarRating/StarRating";
import CommentForm from "../../components/CommentForm/CommentForm";
import useSession from "../../hooks/useSession";
import { addToCart } from "../../ReducerComponent/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";

const Details = () => {
  const { productId } = useParams();
  const sessionData = useSession();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleToCart = (product) => {
    const productToAdd = {
      _id: product._id,
      title: product.title,
      price: parseFloat(product.price.$numberDecimal.toString()).toFixed(2),
      image: product.image[0],
    };
    dispatch(addToCart(productToAdd));
    Swal.fire({
      title: "Added to cart successfully.",
      icon: "success",
      background: "#1a1a1a",
      color: "gold",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
        <Spinner animation="border" role="role" className="text-warning">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger">
        <strong>Error: {error}</strong>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="text-danger">
        <strong></strong>
      </div>
    );
  }

  const price = productDetails.price?.$numberDecimal || productDetails.price;

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-details bg-dark">
        <div className="row container-div-image-side">
          <div className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-top align-items-center div-image-side">
            <h2 className="text-warning text-img-details">
              {productDetails.title}
            </h2>
            <img
              src={
                mainImage ||
                "https://via.placeholder.com/500?text=No+Image+Available"
              }
              alt="Main Product"
              className="img-product-details"
            />
            <div className="thumbnail-container d-flex justify-content-center mt-3">
              {productDetails.image?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail-image me-2"
                  style={{
                    border: mainImage === image ? "2px solid orange" : "none",
                  }}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>

          <div className="col col-md-6 col-lg-6 div-descript mb-5">
            <p className="text-warning">
              Description:{" "}
              <span className="product-text">{productDetails.description}</span>
            </p>
            <p className="text-warning pb-3">
              Price: <span className="product-text">€ {price}</span>
            </p>
            <button
              className="btn btn-warning"
              onClick={() => handleToCart(productDetails)}
            >
              <strong>Add To Cart</strong>
            </button>
            <hr className="text-warning" />
            <div className="pt-3 pb-3 comments-container">
              {comments.length > 0 ? (
                <ul className="ps-0">
                  {comments.map((comment) => (
                    <li key={comment._id}>
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
                <p className="text-danger">You must be logged in.</p>
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
