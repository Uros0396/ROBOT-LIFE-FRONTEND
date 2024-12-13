import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import MainComponent from "../../components/MainComponent/MainComponent";
import Navbar from "../../components/Nav/Navbar";

const HomePage = () => {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <>
      <Navbar setSearchResult={setSearchResult} />
      <MainComponent searchResult={searchResult} />
      <Footer />
    </>
  );
};

export default HomePage;
