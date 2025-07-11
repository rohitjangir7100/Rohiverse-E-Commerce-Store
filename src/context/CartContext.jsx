import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});


export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => setCart((prev) => [...prev, item]);

  const removeFromCart = (id) => {
    if (!id) return;
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAllOfItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ items: cart, addToCart, removeFromCart, removeAllOfItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
