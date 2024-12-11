import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectTotalAmount,
} from "../../../ReducerComponent/cartSlice"; // Assicurati di adattare il percorso
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../../Nav/Navbar";
import Footer from "../../Footer/Footer";

const stripePromise = loadStripe("pk_test_XUIpXpyaGuuw0Dc9Ng80xFWs");

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems }),
        }
      );

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Errore durante il checkout:", error);
      alert("Qualcosa è andato storto. Riprova.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2>Il tuo Carrello</h2>
        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto!</p>
        ) : (
          <>
            <div className="row">
              {cartItems.map((item) => (
                <div key={item._id} className="col-12 mb-3">
                  <div className="d-flex align-items-center justify-content-between border p-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "100px", marginRight: "20px" }}
                      />
                      <div>
                        <h5>{item.title}</h5>
                        <p>Prezzo: ${item.price}</p>
                        <p>Quantità: {item.quantity}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-secondary mx-1"
                        onClick={() => dispatch(decrementQuantity(item._id))}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-primary mx-1"
                        onClick={() => dispatch(incrementQuantity(item._id))}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h4 className="mt-4">Totale: ${totalAmount.toFixed(2)}</h4>
            <div className="mt-3">
              <button
                className="btn btn-warning"
                onClick={() => dispatch(clearCart())}
              >
                Svuota Carrello
              </button>
              <button
                className="btn btn-success ms-3"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Procedi al Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
