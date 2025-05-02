import React, { useState } from "react";
import Cart from "./components/Cart";

const products = [
  { id: "p1", name: "Product One", price: 499 },
  { id: "p2", name: "Product Two", price: 799 },
  { id: "p3", name: "Product Three", price: 999 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-sm">₹{p.price}</p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
