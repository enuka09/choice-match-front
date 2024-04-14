import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { IProduct } from "../../../../models";
import { v4 as uuidv4 } from "uuid";

interface CartContextType {
  cartItems: IProduct[];
  orderId: string;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  return useContext(CartContext)!;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>(() => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : [];
  });

  const [orderId, setOrderId] = useState<string>(() => {
    const storedOrderId = localStorage.getItem("orderId");
    return storedOrderId ? storedOrderId : uuidv4();
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orderId", orderId);
  }, [orderId]);

  const addToCart = useCallback((product: IProduct) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 0) + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    const newOrderId = uuidv4();
    setOrderId(newOrderId);
    localStorage.setItem("orderId", newOrderId);
  }, []);

  const [subtotal, setSubtotal] = useState(0);

  const calculateSubtotal = useCallback(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.unitPrice * (item.quantity || 1);
    });
    setSubtotal(total);
  }, [cartItems]);

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems, calculateSubtotal]);

  return (
    <CartContext.Provider value={{ cartItems, orderId, addToCart, removeFromCart, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
