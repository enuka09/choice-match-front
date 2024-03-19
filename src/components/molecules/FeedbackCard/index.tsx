import React, { useState } from "react";
import { StarRounded } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import * as styles from "./styles";
import { IFeedbackCardProps } from "./types/interface";

const FeedbackCard: React.FC<IFeedbackCardProps> = ({ feedback, customerName }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <Card
        className={styles.FeedbackCard.container}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered ? "0px 8px 16px rgba(0, 0, 0, 0.2)" : "2px 6px 8px 2px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
        }}
      >
        <CardContent style={{ padding: "12px 20px", height: "200px", position: "relative" }}>
          <span className="text-yellow-100">
            <StarRounded className="mb-3" />
            <StarRounded className="mb-3" />
            <StarRounded className="mb-3" />
            <StarRounded className="mb-3" />
            <StarRounded className="mb-3" />
          </span>
          <p className={styles.FeedbackCard.feedback}>{feedback}</p>
          <p className={styles.FeedbackCard.customerName}>~ {customerName}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackCard;
