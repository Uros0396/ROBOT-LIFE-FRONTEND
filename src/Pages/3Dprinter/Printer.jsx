import CardComponent from "../../components/CardComponent/CardComponent";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Nav/Navbar";
import "../3Dprinter/Printer.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllProducts,
  allProducts,
} from "../../ReducerComponent/getProductsReducer";

const Printer = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(allProducts);

  useEffect(() => {
    if (!products.length) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <>
      <Navbar />
      <div className="container-fluid category-page vh-auto">
        <div className="row mb-3 d-flex justify-content-center align-items-center printer-text">
          <div className="col-12 d-flex w-100 flex-column justify-content-center align-items-center text-center">
            <h2 className="text-warning pt-3 pb-3">3D Printer World</h2>
            <img
              className="img-fluid w-100 img-printer"
              src="https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733403326/ROBOTLIFE/workshop_motionlab-berlin_3d-printing-berlin.jpg"
              alt="image-3DPrinter"
            />

            <p className="mt-3 mb-4">
              3D printers have revolutionized the way we create and design
              objects, offering unprecedented versatility and precision in
              various industries. From prototypes to final products, 3D printing
              allows for rapid prototyping, customization, and on-demand
              manufacturing, reducing costs and production time. These printers
              work by layering materials such as plastic, metal, or resin,
              building up an object layer by layer from a digital model. They
              are used in countless fields, including engineering, medicine,
              education, and even home crafting. Whether you're looking to
              create intricate designs, customize objects to your specific
              needs, or bring your ideas to life with precision, 3D printers are
              an invaluable tool. They make it easier for individuals, startups,
              and companies to create unique and complex items without the need
              for large-scale factories or expensive equipment. With the growing
              accessibility of 3D printing technology, more people are able to
              explore their creativity and innovation. If you're interested in
              building your own creations, including robots and gadgets, 3D
              printing is a great place to start. Check out our two videos to
              learn more about how 3D printers work, and get inspired to begin
              building your very own homemade robot today!
            </p>
          </div>
        </div>
        <div className="row mt-5 mb-5 pt-b justify-content-center align-items-start">
          <div className="col-12 text-center printer-text">
            <h3 className="text-warning">
              Take a look at how to build a robot with a 3D Printer
            </h3>
          </div>
          <div className="col-12 col-lg-6 Printer-Video d-flex">
            <div className="ratio ratio-16x9 w-100">
              <iframe
                src="https://www.youtube.com/embed/Zsw35FpJSz0?si=NMqepIQIjRygBmAe"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-12 col-lg-6 Printer-Video d-flex">
            <div className="ratio ratio-16x9 w-100">
              <iframe
                src="https://www.youtube.com/embed/Ftt9e8xnKE4?si=O4a6zPpd6-E3Fy49"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="text-center mt-3 mb-2 printer-text">
            <h3 className="text-warning">Our 3D Printer</h3>
          </div>
          <CardComponent filteredProducts={filteredProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Printer;
