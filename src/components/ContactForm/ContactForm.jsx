import React, { useState } from "react";
import Swal from "sweetalert2";
import "../ContactForm/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    to: "urosm4471@gmail.com",
    subject: "",
    text: "",
  });

  const [status] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
          icon: "success",
          background: "#1a1a1a",
          color: "gold",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });

        setFormData({ to: "urosm4471@gmail.com", subject: "", text: "" });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send the message. Please try again.",
          icon: "error",
          background: "#1a1a1a",
          color: "gold",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        background: "#1a1a1a",
        color: "gold",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
    }
  };

  return (
    <div className="mt-5 pt-5">
      <div className="contact-info mt-5">
        <h4 className="text-warning">Company Contact Information:</h4>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Email:</strong>{" "}
          <a href="mailto:urosm4471@gmail.com">robotlife@gmail.com</a>
        </p>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Phone:</strong> +1 (123) 456-7890
        </p>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Office Address:</strong> 46
          Koppstrasse, Suite 106, Wien, Osterreich, 1080
        </p>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Working Hours:</strong> Monday -
          Friday: 9:00 AM - 6:00 PM
        </p>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Support Hotline:</strong> +1 (800)
          555-1234 (Available 24/7)
        </p>
      </div>

      <h2 className="text-warning">Contact Us</h2>

      <p className="text-light">
        We would love to hear from you. If you have any questions, concerns, or
        need support, feel free to reach out to <br /> us using the contact
        details below or by filling out the form. We aim to respond as quickly
        as possible.
      </p>

      {status && (
        <div
          className={`alert ${
            status.includes("successfully") ? "alert-success" : "alert-danger"
          } mt-3`}
        >
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="pb-4">
        <div className="mb-3">
          <label htmlFor="subject" className="form-label text-light">
            <strong style={{ color: "orange" }}>Robot Model</strong>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="form-control w-50"
            placeholder="Enter the robot model"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label text-light">
            <strong style={{ color: "orange" }}>Message (Text)</strong>
          </label>
          <textarea
            id="text"
            name="text"
            className="form-control w-50"
            value={formData.text}
            onChange={handleChange}
            required
            placeholder="Write your message here..."
            rows="4"
          ></textarea>
        </div>

        <button
          className="btn btn-dark mt-3 border-1 border-warning"
          type="submit"
        >
          <span style={{ color: "gold" }}>Send</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
