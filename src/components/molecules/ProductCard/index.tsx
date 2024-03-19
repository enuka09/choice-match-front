import React, { useState } from "react";
import { ShoppingCartOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { Card, CardContent, CardMedia } from "@mui/material";
import * as styles from "./styles";
import imageI from "../../../assests/new-arrival-1-a.png";

const ProductCard = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        <CardMedia component="img" height="140" image={imageI} alt="Product Image" />
        <CardContent style={{ padding: "14px 0 16px 10px " }}>
          <p className={styles.ProductCard.categoryName}>Card title</p>
          <p className={styles.ProductCard.productName}>Huf & Dee women's t-shirt</p>
          <p className={styles.ProductCard.price}>LKR 2,650.00</p>
        </CardContent>
        {isHovered && (
          <div className={styles.ProductCard.iconContainer}>
            <button className={styles.ProductCard.icon}>
              <FavoriteBorderOutlined />
            </button>
            <button className={styles.ProductCard.icon}>
              <ShoppingCartOutlined />
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductCard;
