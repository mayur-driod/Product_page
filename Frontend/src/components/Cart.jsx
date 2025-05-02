import React, { useState } from "react";
import axios from "axios";

const Cart = ({ cart, setCart }) => {
  const [contact, setContact] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    if (!contact) return alert("Please enter your email or phone number");

    try {
      // 1. Create order on backend
      const { data } = await axios.post("http://localhost:3000/api/create", {
        contact,
        items: cart,
        totalAmount: total
      });

      // 2. Open Razorpay checkout
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await axios.post("http://localhost:3000/api/verify", response);
          alert("Payment successful! 🎉 Order ID: " + verifyRes.data.order._id);
          setCart([]);  // Clear cart
        },
        prefill: {
          contact: contact
        },
        theme: {
          color: "#0f766e"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the payment.");
    }
  };

  return (
    <div className="mt-6 p-4 border-t">
      <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between my-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="my-2 font-bold">Total: ₹{total}</div>

          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter email or phone"
            className="border px-3 py-1 w-full rounded my-2"
          />

          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
