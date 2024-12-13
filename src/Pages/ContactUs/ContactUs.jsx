import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/ContactForm/ContactForm";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid  vh-100">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
