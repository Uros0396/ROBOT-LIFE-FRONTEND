import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    to: "support@example.com",
    subject: "",
    text: "",
    html: "",
  });

  const [status, setStatus] = useState(null);

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
        setStatus("Message sent successfully!");
        setFormData({ to: "", subject: "", text: "", html: "" });
      } else {
        setStatus("Error sending the message. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending the message. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="mt-5 pt-5">
      <div className="contact-info mt-5">
        <h4 className="text-warning">Company Contact Information:</h4>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Email:</strong>{" "}
          <a href="mailto:RobotLife@gmail.com">RobotLife@gmail.com</a>
        </p>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Phone:</strong> +1 (123) 456-7890
        </p>
        <p className="text-light">
          <strong style={{ color: "orange" }}>Office Address:</strong> 123
          Business Road, Suite 456, Cityname, State, 12345
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

      {status && <p>{status}</p>}

      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center w-25">
          <label htmlFor="subject">
            <strong style={{ color: "orange" }}>Robot Model</strong>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex justify-content-between align-items-center w-25 mt-2">
          <label htmlFor="text">
            <strong style={{ color: "orange" }}>Message (Text)</strong>
          </label>
          <textarea
            id="text"
            name="text"
            className="w-100"
            value={formData.text}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button className="btn bg-black mt-2" type="submit">
          <span style={{ color: "orange" }}>Send</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
