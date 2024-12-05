import React, { useState, useEffect } from "react";
import "../MainComponent/MainComponent.css";
import Description from "../DescriptionHomepage/DescriptionHomePage";
import SingleRandomCard from "../SingleRandomCard/SingleRandomCard";

const images = [
  "https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733410739/ROBOTLIFE/1000_F_370280312_JN6CoZyzdOT6qyAJ1H9vKiHui9h7t9t2.jpg",
  "https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733389721/ROBOTLIFE/CyberDog_05.jpg",

  "https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733389882/ROBOTLIFE/digital-transformation-ai-artificial-intelligence-260nw-2448145595.jpg",
];

const MainComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <Description />
      <SingleRandomCard />
    </main>
  );
};

export default MainComponent;
