import React from "react";
import { IServiceCard } from "./types/interface";
import * as styles from "./styles";

const ServiceCard: React.FC<IServiceCard> = ({ icon, title }) => {
  return (
    <div className={styles.serviceCard.container}>
      {icon}
      <div className={styles.serviceCard.textContainer}>
        <h6 className={styles.serviceCard.text}>{title}</h6>
      </div>
    </div>
  );
};

export default ServiceCard;
