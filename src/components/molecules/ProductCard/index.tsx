import React, { useState } from "react";
import { ShoppingCartOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { Card, CardContent, CardMedia } from "@mui/material";
import * as styles from "./styles";
import { IProduct } from "../../../models";
import { useCart } from "../../../components";
import { formatPrice } from "../../../utils/priceFormat";
import CartDrawer from "../../../pages/shoppingCart";

const ProductCard = (props: IProduct) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <div>
      <Card
        className={styles.ProductCard.container}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          transform: isHovered ? "translateY(-6px)" : "none",
        }}
      >
        <CardMedia component="img" height="140" image={props.image} alt="Product Image" />
        <CardContent style={{ padding: "14px 0 16px 10px " }}>
          <p className={styles.ProductCard.categoryName}>{props.mainCategory}</p>
          <p className={styles.ProductCard.productName}>{props.name}</p>
          <p className={styles.ProductCard.price}>{formatPrice(props.unitPrice)}</p>
        </CardContent>
        {isHovered && (
          <div className={styles.ProductCard.iconContainer}>
            <button className={styles.ProductCard.icon}>
              <FavoriteBorderOutlined />
            </button>
            <button
              className={styles.ProductCard.icon}
              onClick={() => {
                addToCart(props);
                handleCartClick();
              }}
            >
              <ShoppingCartOutlined />
            </button>
          </div>
        )}
      </Card>
      <CartDrawer openCart={isCartOpen} onCartClose={handleCartClose} />
    </div>
  );
};

export default ProductCard;
