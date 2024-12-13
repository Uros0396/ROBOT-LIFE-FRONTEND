import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/ContactForm/ContactForm";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark vh-auto">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
