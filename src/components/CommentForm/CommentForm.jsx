import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postComment,
  isCommentLoading,
  commentError,
} from "../../ReducerComponent/commentSlice";

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
      alert("Commento e valutazione sono obbligatori!");
      return;
    }

    if (!userId || !productId) {
      alert("ID utente e ID prodotto non sono validi!");
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
        console.error("Errore nel postare il commento:", error);
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
            placeholder="Scrivi un commento..."
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
            placeholder="Valutazione (1-5)"
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
      {error && <p style={{ color: "red" }}>Errore: {error}</p>}
    </div>
  );
};

export default CommentForm;
