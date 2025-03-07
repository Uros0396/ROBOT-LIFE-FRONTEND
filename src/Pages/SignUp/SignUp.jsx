import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import RegisterUser from "../../components/RegisterUser/RegisterUser";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid category-page vh-auto">
        <RegisterUser />
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
