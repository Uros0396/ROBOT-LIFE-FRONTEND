import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
} from "../../../ReducerComponent/cartSlice";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSession from "../../../hooks/useSession";
import Navbar from "../../Nav/Navbar";
import Footer from "../../Footer/Footer";
import "../CartPage/CartPage.css";
import Swal from "sweetalert2";

const CartPage = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const cartItems = useSelector(selectCartItems);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    if (
      !shippingAddress.fullName ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      setOrderMessage("Compila tutti i campi dello shipping address.");
      return;
    }
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) {
      console.error("Stripe o Elements non inizializzati");
      return;
    }

    setIsSubmitting(true);
    setOrderMessage("Elaborazione...");

    const orderData = {
      user: session?._id || null,
      items: cartItems.map((item) => ({
        products: [
          {
            product: item._id,
            quantity: item.quantity,
            price: parseFloat(item.price.toString()),
          },
        ],
        subTotal: (parseFloat(item.price) * item.quantity).toFixed(2),
      })),
      shippingAddress,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setOrderMessage(`Error: ${errorData.message}`);
        return;
      }

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setOrderMessage(`Payment error: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
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
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setOrderMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartTotal = cartItems
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5 bg-dark container-cartPage">
        <h1 style={{ color: "orange" }} className="mt-5 pt-5">
          Cart
        </h1>

        {cartItems.length > 0 ? (
          <>
            <h2 className="text-warning mt-5">Items in Cart:</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="cartItem">
                <div className="mb-3">
                  <h4 className="mb-3 mt-3 text-warning">{item.title}</h4>
                  <img src={item.image} width={200} alt="item-image" />

                  <div className="mt-4">
                    <button
                      onClick={() => dispatch(decrementQuantity(item._id))}
                      disabled={item.quantity <= 1}
                      className="decrement"
                    >
                      <span className="text-white">-</span>
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item._id))}
                      className="increment"
                    >
                      <span className="text-white">+</span>
                    </button>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="remove-button"
                      aria-label="Remove Element"
                    >
                      <Trash2 size="24" color="yellow" className="bg-black" />
                    </button>
                  </div>
                  <p className="text-warning mt-4">
                    Total Price: €
                    {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {!isConfirmed ? (
              <>
                <div className="my-2">
                  <h3 className="text-warning mb-3">Your shipping address</h3>
                  <form className="d-flex flex-column justify-content-start gap-3 form-mobile">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      value={shippingAddress.street}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="CAP"
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      required
                    />
                  </form>
                </div>
                <button
                  onClick={handleConfirmOrder}
                  className="btn text-warning bg-black mt-2 mb-5"
                >
                  Confirm Order (€{cartTotal})
                </button>
              </>
            ) : (
              <>
                <div>
                  <h5 className="text-warning">Payment</h5>
                  <CardElement className="card-element mt-3" />
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="btn bg-black text-warning mt-3"
                  >
                    {isSubmitting ? "Elaboration..." : "Make Payment"}
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <p className="text-warning">Cart is empty</p>
        )}

        {orderMessage && (
          <p className="statusMessage text-warning">{orderMessage}</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
