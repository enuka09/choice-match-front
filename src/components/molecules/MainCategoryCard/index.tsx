import React from "react";
import { Link } from "react-router-dom";
import * as styles from "./styles";
import { IMainCategoryCard } from "./types/interface";

const MainCategoryCard: React.FC<IMainCategoryCard> = ({ imageUrl, index, title }) => {
  return (
    <div className={styles.mainCategoryCard.container}>
      <img src={imageUrl} alt={`Category ${index + 1}`} className="w-full" />
      <div className={styles.mainCategoryCard.textContainer}>
        <p className={styles.mainCategoryCard.title}>{title}</p>
        <Link
          to={`/${index === 0 ? "women" : index === 1 ? "men" : "kids"}-category`}
          className={styles.mainCategoryCard.text}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default MainCategoryCard;
