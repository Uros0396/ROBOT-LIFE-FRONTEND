import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    to: "recipient@example.com",
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
      const response = await fetch("http://localhost:4600/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Email inviata con successo!");
        setFormData({ to: "", subject: "", text: "", html: "" });
      } else {
        setStatus("Errore nell'invio dell'email. Riprova.");
      }
    } catch (error) {
      setStatus("Errore nell'invio dell'email. Riprova.");
      console.error(error);
    }
  };

  return (
    <div className="mt-5 pt-5">
      <h2 className="text-warning">Contattaci</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Oggetto</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Messaggio (Testo)</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default ContactForm;
