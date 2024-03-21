import { useState } from "react";
import { Delete } from "@mui/icons-material";

const CartContent = ({ cartItems }: { cartItems: any[] }) => {
  const [subtotal, setSubtotal] = useState(0);

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
    setSubtotal(total);
  };

  // Function to remove item from cart
  const removeFromCart = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    // Update cart items
  };

  return (
    <div className="product-list">
      {cartItems.map((item, index) => (
        <div className="row cart-item-row mb-3" key={index}>
          <div className="col-4 product-image-container">
            <img src={item.image} alt={item.name} className="img-fluid" />
          </div>
          <div className="col-6 cart-item-list">
            <h6 className="product-name">{item.name}</h6>
            <p>Color: {item.color}</p>
            <p className="product-price">${item.price.toFixed(2)}</p>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center trash-icon-container">
            <button onClick={() => removeFromCart(index)}>
              <Delete className="text-red-600" fontSize="small" />
            </button>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-between subtotal-section">
        <p className="subtotal-text">Sub Total :</p>
        <p className="price-text">${subtotal.toFixed(2)}</p>
      </div>
      <div className="d-flex justify-content-between cart-buttons mt-4">
        <button className="btn btn-cart-checkout">Checkout</button>
        <button className="btn btn-cart-detailed">Detailed Checkout</button>
      </div>
    </div>
  );
};

export default CartContent;
