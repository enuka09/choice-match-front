import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="mb-4 rounded-sm border-none bg-primary-100 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-primary-300 hover:shadow-lg sm-max:px-4 sm-max:py-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
