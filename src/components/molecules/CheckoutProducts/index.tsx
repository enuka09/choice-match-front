import React from "react";
import { productDetails } from "./styles";
import { IProduct } from "../../../models";
import { formatPrice, useCheckout } from "../../../utils";

export interface CheckoutProductsProps {
  cartItems: IProduct[];
}

const CheckoutProducts: React.FC<CheckoutProductsProps> = ({ cartItems }) => {
  const { discount, deliveryCharge, total, subtotal } = useCheckout();

  return (
    <div className={productDetails.container}>
      <h2 className={productDetails.topic}>Purchase Information</h2>
      {cartItems.map((item, index) => (
        <div key={index} className={productDetails.productContainer}>
          <img src={item.image} alt={item.name} className={productDetails.productImage} />
          <div>
            <h6 className={productDetails.productName}>{item.name}</h6>
            <p className={productDetails.productCategory}>{item.mainCategory}</p>
            <p className={productDetails.quantity}>Ouantity : {item.quantity}</p>
            <p className={productDetails.price}>{formatPrice(item.unitPrice)}</p>
          </div>
        </div>
      ))}
      <div className={productDetails.totalContainer}>
        <div className={productDetails.rates}>
          <p>Sub Total :</p>
          <p>{formatPrice(subtotal)}</p>
        </div>
        <div className={productDetails.rates}>
          <p>Delivery Charge :</p>
          <p>{formatPrice(deliveryCharge)}</p>
        </div>
        <div className={productDetails.rates}>
          <p>Total Discount :</p>
          <p>{formatPrice(discount)}</p>
        </div>
      </div>

      <p className={productDetails.netTotal}>
        <span>Net Total :</span>
        <span>{formatPrice(total)}</span>
      </p>
    </div>
  );
};

export default CheckoutProducts;
