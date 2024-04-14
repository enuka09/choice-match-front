import { createContext, useContext } from "react";
import { useCart } from "../components";

interface CheckoutContextType {
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
  return useContext(CheckoutContext)!;
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subtotal } = useCart();

  const deliveryCharge = subtotal >= 7500 ? 0 : 500;

  let discount = 0;
  if (subtotal > 10000) {
    discount = subtotal * 0.1;
  } else if (subtotal > 5000) {
    discount = subtotal * 0.05;
  } else if (subtotal > 3000) {
    discount = subtotal * 0.02;
  }

  const total = subtotal + deliveryCharge - discount;
  return (
    <CheckoutContext.Provider value={{ subtotal, deliveryCharge, discount, total }}>
      {children}
    </CheckoutContext.Provider>
  );
};
