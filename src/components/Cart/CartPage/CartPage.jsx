import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectTotalAmount,
} from "../../../ReducerComponent/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "../../Nav/Navbar";
import Footer from "../../Footer/Footer";
import "../CartPage/CartPage.css";
import { Trash2 } from "lucide-react";
import useSession from "../../../hooks/useSession";
import { Plus, Minus } from "lucide-react";

const stripePromise = loadStripe("pk_test_XUIpXpyaGuuw0Dc9Ng80xFWs");

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    street: "",
    houseNumber: "",
    city: "",
    CAP: "",
    country: "",
  });

  const session = useSession();
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleCheckout = async () => {
    if (!stripe || !elements) {
      console.log("Stripe or Elements not loaded");
      return;
    }

    if (!session) {
      alert("You need to be logged in to proceed with checkout.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({
            user: session._id,
            items: cartItems,
            shippingAddress: shippingDetails,
            totalPrice: totalAmount,
          }),
        }
      );

      const sessionData = await response.json();

      if (sessionData.error) {
        throw new Error(sessionData.error);
      }

      const clientSecret = sessionData.clientSecret;

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        dispatch(clearCart());
      } else {
        throw new Error("Payment failed.");
      }
    } catch (error) {
      setError(error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5 bg-dark container-cartPage">
        <h2 style={{ color: "orange" }} className="mt-5 pt-5">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p style={{ color: "orange" }}>Your cart is empty!</p>
        ) : (
          <>
            <div className="row">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="col col-md-12 col-lg-12 d-flex flex-column mt-5 mb-3"
                >
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100px",
                          height: "150px",
                          marginRight: "20px",
                        }}
                      />
                      <div>
                        <h5 className="text-warning">{item.title}</h5>
                        <p style={{ color: "orange" }}>
                          <span className="text-warning">Price: $</span>
                          {item.price}
                        </p>
                        <p style={{ color: "orange" }}>
                          <span className="text-warning">Quantity:</span>
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn mx-1"
                        onClick={() => dispatch(decrementQuantity(item._id))}
                      >
                        <Minus style={{ color: "gray" }} />
                      </button>
                      <button
                        className="btn mx-1"
                        onClick={() => dispatch(incrementQuantity(item._id))}
                      >
                        <Plus style={{ color: "gray" }} />
                      </button>
                      <button
                        className="btn mx-1"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h4 style={{ color: "orange" }} className="mt-4">
              <span className="text-warning">Total: $</span>
              {totalAmount.toFixed(2)}
            </h4>
            <div className="mt-3">
              <button
                className="btn btn-warning"
                onClick={() => dispatch(clearCart())}
              >
                <strong>Empty Cart</strong>
              </button>
              <button
                className="btn btn-success ms-3"
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || loading}
              >
                <strong className="text-warning">
                  {loading ? "Processing..." : "Proceed with checkout"}
                </strong>
              </button>
            </div>
            <div className="mt-4">
              <h4 style={{ color: "orange" }}>Shipping Address</h4>
              <form>
                {Object.keys(shippingDetails).map((field) => (
                  <div className="mb-3" key={field}>
                    <label htmlFor={field} style={{ color: "orange" }}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      className="form-control"
                      value={shippingDetails[field]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </form>
            </div>
            <div className="mt-4">
              <h4 style={{ color: "orange" }}>Payment Details</h4>
              <CardElement />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
