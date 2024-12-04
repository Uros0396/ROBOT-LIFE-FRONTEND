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
  console.log("Category", category);
  console.log("Filtered", filteredProducts);

  return (
    <div className="category-page">
      <h1 className="text-center">{category}</h1>

      {isLoading && <p className="text-center">Loading...</p>}

      {error && <p className="text-center text-danger">{error}</p>}

      {!isLoading && filteredProducts.length === 0 && !error && (
        <p className="text-center">No products found in this category.</p>
      )}

      <div className="row">
        <CardComponent
          filteredProducts={filteredProducts}
          key={filteredProducts._id}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
