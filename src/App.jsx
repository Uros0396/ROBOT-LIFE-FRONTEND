import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import SignUp from "./Pages/SignUp/SignUp";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Printer from "./Pages/3Dprinter/Printer";
import Categories from "./Pages/Categories/Categories";
import Login from "./components/Login/Login";
import SuccessLoginGoogle from "./components/SuccessLoginGoogle/SuccessLoginGoogle";
import NotFoundPage from "./Pages/Categories/NotFoundPage/NotFoundPage";
import CategoryPage from "./Pages/CategoryPages/CategoryPages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/success" element={<SuccessLoginGoogle />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Contact Us" element={<ContactUs />} />
        <Route path="/Printer" element={<Printer />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Categories/:category" element={<CategoryPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
