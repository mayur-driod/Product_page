import React, { useEffect, useState } from "react";
import Cart from "./components/Cart";
import { FaCartArrowDown } from "react-icons/fa";
import ScrollToBottomButton from "./components/ScrollToBottomButton";

const products = [
  {
    id: "p1",
    name: "Product One",
    price: 499,
    pic: "https://th.bing.com/th/id/OIP.1KVlCiv3s-5Vh_457_4LoQHaGY?rs=1&pid=ImgDetMain",
  },
  {
    id: "p2",
    name: "Product Two",
    price: 799,
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qYMHJPHmmXKcJ1GDxsQnQaGSxylWUePvFw&s",
  },
  {
    id: "p3",
    name: "Product Three",
    price: 999,
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BLTynbKQhO5K-zLGmYx0ZxS45Aqmsm8Rjw&s",
  },
];

function Buy() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Product Section */}
      <div className="w-full md:w-2/3 p-6">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <img className="w-50 h-50 object-cover rounded" src={p.pic} />
              <p className="text-sm mb-2">₹{p.price}</p>
              <button
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => addToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full md:w-1/3 p-6 border-t md:border-t-0 md:border-l bg-white">
        <Cart cart={cart} setCart={setCart} />
      </div>

      <ScrollToBottomButton />
    </div>
  );
}

export default Buy;
