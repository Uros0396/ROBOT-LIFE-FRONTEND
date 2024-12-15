import React from "react";
import "../SuccesRegisterModal/SuccesRegModal.css";

const SuccessModal = ({ isOpen, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className={`modal-content ${
          message.startsWith("Error") ? "error" : "success"
        }`}
      >
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default SuccessModal;
