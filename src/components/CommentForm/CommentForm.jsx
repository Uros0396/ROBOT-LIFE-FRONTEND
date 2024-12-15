import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postComment,
  isCommentLoading,
  commentError,
} from "../../ReducerComponent/commentSlice";
import "../CommentForm/CommentForm.css";

const CommentForm = ({ productId, userId, onCommentSubmit }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isCommentLoading);
  const error = useSelector(commentError);

  const [formData, setFormData] = useState({
    comment: "",
    rate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.comment || !formData.rate) {
      alert("Comment and rating are required!");
      return;
    }

    if (!userId || !productId) {
      alert("User ID and product ID are not valid!");
      return;
    }

    const dataToSubmit = {
      ...formData,
      rate: parseInt(formData.rate, 10),
      user: userId,
      product: productId,
    };

    dispatch(postComment(dataToSubmit))
      .then((newComment) => {
        if (newComment) {
          onCommentSubmit(newComment);
        }
      })
      .catch((error) => {
        console.error("Error posting the comment:", error);
      });

    setFormData({
      comment: "",
      rate: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="form-control mb-2"
            name="comment"
            placeholder="Let a review"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="form-control mb-2"
            type="number"
            name="rate"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={formData.rate}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary bg-warning text-black"
          disabled={isLoading || !formData.comment || !formData.rate}
        >
          {isLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default CommentForm;
