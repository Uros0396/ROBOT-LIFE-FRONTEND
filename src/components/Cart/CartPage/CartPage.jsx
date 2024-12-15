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
import Navbar from "../../Nav/Navbar";
import Footer from "../../Footer/Footer";
import "../CartPage/CartPage.css";
import { Trash2 } from "lucide-react";
import { Plus, Minus } from "lucide-react";
import useSession from "../../../hooks/useSession";
import Swal from "sweetalert2";
import ValidationPayment from "../../../middleware/ValidationPayment/ValidationPayment";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    const isValid = ValidationPayment(shippingDetails);
    if (!isValid) {
      setLoading(false);
      return;
    }

    const totalPrice = cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

    const orderData = {
      user: session?._id || null,
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: parseFloat(item.price.toString()),
      })),
      shippingDetails,
      totalPrice,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const sessionData = await response.json();

      if (sessionData.error) {
        throw new Error(sessionData.error);
      }

      Swal.fire({
        title: "Payment successfully.",
        icon: "success",
        background: "#1a1a1a",
        color: "gold",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
      dispatch(clearCart());
    } catch (error) {
      setError(error.message);
      Swal.fire({
        title: "Something goes wrong!.",
        icon: "warning",
        background: "#1a1a1a",
        color: "gold",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
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
          <p className="mb-0 pb-0" style={{ color: "orange" }}>
            Your cart is empty!
          </p>
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
            <div className="mt-4 mb-0 pb-0">
              <h4 style={{ color: "orange" }}>Shipping Address</h4>
              <form className="col-sm-12 col-md-6 col-lg-6 ">
                {Object.keys(shippingDetails).map((field) => (
                  <div className="pb-3" key={field}>
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
