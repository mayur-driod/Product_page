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


  const updateQuantity = (id, delta) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
<div className="mt-6 p-4">
  <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

  {cart.length === 0 ? (
    <p className="text-gray-600">No items in cart</p>
  ) : (
    <>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.pic || "https://via.placeholder.com/50"}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <span className="text-right font-semibold text-gray-700">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-lg font-bold text-right">
        Total: ₹{total}
      </div>

      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Enter email or phone"
        className="border border-gray-300 px-4 py-2 w-full rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handlePayment}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-3 w-full transition"
      >
        Pay Now
      </button>
    </>
  )}
</div>
  );
};

export default Cart;
