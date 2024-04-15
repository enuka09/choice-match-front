import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "../../../_layouts/styles";
import { checkout } from "../styles";
import { Routes } from "../../../routing/routes";
import { CustomTextField, useCart, CheckoutProducts } from "../../../components";
import { useCheckout } from "../../../utils";
import logo from "../../../assests/logo/main_logo.png";

const CheckoutShipping = () => {
  const navigate = useNavigate();
  const { orderId, cartItems } = useCart();
  const { subtotal, deliveryCharge, discount, total } = useCheckout();

  const [shippingDetails, setShippingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postal: "",
    country: "Sri Lanka",
    phoneNumber: "",
  });

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleBilling = () => {
    navigate(`${Routes.CHECKOUT_BILLING}/${orderId}`, {
      state: { orderId, cartItems, shippingDetails, subtotal, deliveryCharge, discount, total },
    });
    console.log("Shipping details:", { ...shippingDetails, cartItems, subtotal, deliveryCharge, discount, total });
  };

  return (
    <>
      <div className="hidden">{orderId}</div>
      <div className={styles.topHeader.container}>
        <p>
          Shop, Smile, Repeat. Discover your style with AI-Powered Fashion! Enjoy free delivery on orders over LKR
          7500/-
        </p>
      </div>
      <div className={checkout.container}>
        <div className={checkout.leftSection}>
          <img src={logo} alt="logo" className={checkout.logo} />
          <div className={checkout.leftTopContent}>
            <h2 className={checkout.topic}>Contact Details</h2>
            <p className={checkout.subTopic}>Please provide a valid email address to connect with you easily</p>
            <CustomTextField
              name="email"
              value={shippingDetails.email}
              type="email"
              onChange={handleOrderChange}
              label="Email Address"
            />
          </div>
          <h2 className={checkout.topic}>Shipping Details</h2>
          <p className={checkout.subTopic}>Please provide accurate shipping information to avoid delivery delays</p>
          <div className={checkout.leftBottomContent}>
            <CustomTextField
              name="country"
              value="Sri Lanka"
              type="text"
              onChange={handleOrderChange}
              label="Country"
            />
            <div className={checkout.input}>
              <CustomTextField
                name="firstName"
                value={shippingDetails.firstName}
                type="text"
                onChange={handleOrderChange}
                label="First Name"
              />
              <CustomTextField
                name="lastName"
                value={shippingDetails.lastName}
                type="text"
                onChange={handleOrderChange}
                label="Last Name"
              />
            </div>
            <CustomTextField
              multiline
              rows={2}
              name="address"
              value={shippingDetails.address}
              type="text"
              onChange={handleOrderChange}
              label="Address"
            />
            <div className={checkout.input}>
              <CustomTextField
                name="city"
                value={shippingDetails.city}
                type="text"
                onChange={handleOrderChange}
                label="City"
              />
              <CustomTextField
                name="postal"
                value={shippingDetails.postal}
                type="text"
                onChange={handleOrderChange}
                label="Postal"
              />
            </div>
            <CustomTextField
              name="phoneNumber"
              value={shippingDetails.phoneNumber}
              type="text"
              onChange={handleOrderChange}
              label="Phone Number"
            />
          </div>
          <div className={checkout.buttonContainer}>
            <button className={checkout.leftButton}>Return to Cart</button>
            <button className={checkout.rightButton} onClick={handleBilling}>
              Continue to Payment
            </button>
          </div>
        </div>
        <CheckoutProducts cartItems={cartItems} />
      </div>
    </>
  );
};

export default CheckoutShipping;
