import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routing/routes";
import { useCart } from "../../../components";

interface CartButtonsProps {
  onCartClose: () => void;
}

export const CheckoutButton: React.FC<CartButtonsProps> = ({ onCartClose }) => {
  const navigate = useNavigate();
  const { orderId } = useCart();

  const handleCheckout = () => {
    navigate(`${Routes.CHECKOUT_SHIPPING}/${orderId}`);
    onCartClose();
  };
  return (
    <>
      <button
        onClick={handleCheckout}
        className="w-[calc(50%-0.5rem)] rounded-sm bg-primary-100 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-primary-300"
      >
        Checkout
      </button>
    </>
  );
};

export const DetailedCartButton: React.FC<CartButtonsProps> = ({ onCartClose }) => {
  const navigate = useNavigate();
  const { orderId } = useCart();

  const handleCart = () => {
    navigate(`${Routes.CART}/${orderId}`);
    onCartClose();
  };
  return (
    <>
      <button
        onClick={handleCart}
        className="w-[calc(50%-0.5rem)] rounded-sm border border-primary-300 bg-white px-4 py-2 font-bold text-primary-100 transition duration-300 ease-in-out hover:bg-primary-300 hover:text-white"
      >
        Detailed Cart
      </button>
    </>
  );
};
