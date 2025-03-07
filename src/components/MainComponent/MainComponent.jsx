import React, { useState, useEffect } from "react";
import "../MainComponent/MainComponent.css";
import Description from "../DescriptionHomepage/DescriptionHomePage";
import SingleRandomCard from "../SingleRandomCard/SingleRandomCard";

const images = [
  "https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733410739/ROBOTLIFE/1000_F_370280312_JN6CoZyzdOT6qyAJ1H9vKiHui9h7t9t2.jpg",
  "https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733389721/ROBOTLIFE/CyberDog_05.jpg",
  "https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733389882/ROBOTLIFE/digital-transformation-ai-artificial-intelligence-260nw-2448145595.jpg",
];

const MainComponent = ({ searchResult = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [searchPerformed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150";
  };

  return (
    <main className="bg-dark">
      <div className="carousel">
        <div
          className="carousel-slides"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div className="carousel-slide" key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      </div>

      <Description />

      <SingleRandomCard />

      {searchPerformed && searchResult.length === 0 ? (
        <p className="text-warning">No results found</p>
      ) : (
        searchResult.length > 0 && (
          <div>
            <hr style={{ color: "orange" }} />
            <h2 className="text-warning">Search Results For:</h2>
            {searchResult.map((product) => (
              <div key={product._id} className="container-fluid pb-5">
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                    <h3 style={{ color: "orange" }}>{product.title}</h3>{" "}
                    <img
                      src={product.image[0]}
                      className="img-fluid"
                      style={{
                        maxHeight: "400px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                    <p className="text-warning mt-5">{product.description}</p>
                    <p className="text-light">
                      To view the product details, price, and make a purchase,
                      you need to sign up for RobotLife. After registering,
                      navigate to the "Category" section to find the product
                      you're interested in. Once you've found it, you'll be able
                      to access all the detailed information and proceed with
                      your purchase.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </main>
  );
};

export default MainComponent;
