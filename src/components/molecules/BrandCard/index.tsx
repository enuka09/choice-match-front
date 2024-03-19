import React, { useState } from "react";
import { Card, CardMedia } from "@mui/material";
import { IBrandCard } from "./types/interface";

const BrandCard: React.FC<IBrandCard> = ({ imageUrl, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`cursor-pointer px-4 py-6 ${isActive ? "active" : ""}`}
      style={{
        transform: isHovered ? "scale(1.03)" : "none",
        transition: "transform 0.3s ease-in-out",
        boxShadow: isHovered ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="/">
        <CardMedia component="img" image={imageUrl} alt="Brand" className="brand-image" />
      </a>
    </Card>
  );
};

export default BrandCard;
