import "./App.css";
import MainComponent from "./components/MainComponent/MainComponent";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <>
      <Navbar />
      <MainComponent />
      <Footer />
    </>
  );
};

export default App;
