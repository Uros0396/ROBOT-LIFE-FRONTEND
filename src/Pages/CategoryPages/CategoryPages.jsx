import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../ReducerComponent/getProductsReducer";
import CardComponent from "../../components/CardComponent/CardComponent";
import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import "../CategoryPages/CategoryPages.css";
import { Spinner } from "react-bootstrap";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);
  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
          <Spinner animation="border" role="role" className="text-warning">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      )}
      <div className="container-fluid  category-page">
        <h2 className="text-center pb-5 category-title">{category}</h2>

        {error && <p className="text-center text-danger">{error}</p>}

        {!isLoading && filteredProducts.length === 0 && !error && (
          <p className="text-center">No products found in this category.</p>
        )}

        <div className="row justify-content-center g-3">
          <CardComponent
            filteredProducts={filteredProducts}
            key={filteredProducts._id}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
