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
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Row className="g-5 text-center">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {!isLoading && !error && (
            <>
              {categories.map((category) => (
                <Col key={category} lg={4} md={6} sm={6}>
                  <div
                    className="div-3"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h3>{category}</h3>
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
