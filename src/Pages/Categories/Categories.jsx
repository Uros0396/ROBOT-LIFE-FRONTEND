import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import "../Categories/Categories.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  allProducts,
  isProductLoading,
  errorProduct,
} from "../../ReducerComponent/getProductsReducer";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(allProducts);
  const isLoading = useSelector(isProductLoading);
  const error = useSelector(errorProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/Categories/${category}`);
  };

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <>
      <Navbar />

      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 mt-5"
      >
        <Row className="g-5 pt-5 text-center">
          {isLoading && (
            <div
              className="d-flex justify-content-center align-items-center bg-dark min-vh-100-custom"
              style={{ minHeight: "100vh" }}
            >
              <Spinner animation="border" role="role" className="text-warning">
                <span className="visually-hidden"></span>
              </Spinner>
            </div>
          )}
          {error && (
            <p className="text-danger">
              <strong>Error: {error}</strong>
            </p>
          )}
          {!isLoading && !error && (
            <>
              {categories.map((category) => (
                <Col key={category} lg={4} md={12} sm={12}>
                  <div
                    className="div-1"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <a href="" className="category-title">
                      <h3>{category}</h3>
                    </a>
                  </div>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Categories;
