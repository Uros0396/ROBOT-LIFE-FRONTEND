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
  isProductLoading,
  errorProduct,
} from "../../ReducerComponent/getProductsReducer";

const Printer = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

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
        <div className="row mb-3">
          <div className="col justify-content-center text-light">
            <img
              className="img-printer"
              src="https://res.cloudinary.com/dhoq8vx2k/image/upload/v1733403326/ROBOTLIFE/workshop_motionlab-berlin_3d-printing-berlin.jpg"
              alt="image-3DPrinter"
            />
            <p className="printer-text">
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
        <div className="row mb-5 pt-b d-flex justify-content-between gap-1">
          <div className="col-6 Printer-Video">
            <iframe
              width="600"
              height="400"
              src="https://www.youtube.com/embed/Zsw35FpJSz0?si=NMqepIQIjRygBmAe"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-6 Printer-Video">
            <iframe
              width="600"
              height="400"
              src="https://www.youtube.com/embed/Ftt9e8xnKE4?si=O4a6zPpd6-E3Fy49"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div className="row justify-content-center">
          <CardComponent filteredProducts={filteredProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Printer;
