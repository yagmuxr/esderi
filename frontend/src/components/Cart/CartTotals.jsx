import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const CartTotals = () => {
  const { cartItems } = useContext(CartContext);
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  console.log("Stripe Public Key:", stripePublicKey);
  console.log("API URL:", apiUrl);

  const cartItemsTotals = cartItems.map(item => {
    const itemPrice = typeof item.price === 'number' ? item.price : (item.price && typeof item.price.current === 'number' ? item.price.current : 0);
    const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return itemPrice * itemQuantity;
  });

  const subTotal = cartItemsTotals.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const shippingCost = 15.00;
  const total = subTotal + shippingCost;

  const handlePayment = async () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (!user) {
      return message.info("Please make an account!");
    }

    const body = { 
      products: cartItems,
      user: user,
      cargoFee: shippingCost,
    };

    console.log("Request Body:", body);

    try {
      const stripe = await loadStripe(stripePublicKey);
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error("Failed to create payment session");
      }

      const session = await res.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        message.error(result.error.message);
      }
    } catch (error) {
      console.log("Payment Error:", error);
      message.error("Payment processing failed. Please try again.");
    }
  }

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotal.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>$15.00</label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${total.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartTotals;
