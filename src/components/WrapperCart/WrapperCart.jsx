import { Elements } from "@stripe/react-stripe-js";
import CartPage from "../Cart/CartPage/CartPage";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
} from "../../ReducerComponent/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XUIpXpyaGuuw0Dc9Ng80xFWs");

const WrapperCart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <Elements stripe={stripePromise}>
      <CartPage />
    </Elements>
  );
};

export default WrapperCart;
