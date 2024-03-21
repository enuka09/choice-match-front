import React from "react";
import * as theme from "../../../../theme";
import { themeCard } from "./styles";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ICompetitionCard } from "./types/interface";

const Card: React.FC<ICompetitionCard> = ({ imageUrl, title, description, additionalDetails, onClick }) => {
  return (
    <div className={`theme-card ${themeCard.container}`}>
      <div className={themeCard.image} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={`theme-description ${themeCard.textContainer}`}>
        <div>
          <p className={themeCard.topic}>{title}</p>
          <p className={themeCard.description}>{description}</p>
        </div>
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography className="text-primary-300">More Tips</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{additionalDetails}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <button className={`${theme.form.button} ${themeCard.button}`} type="button" onClick={onClick}>
          Take Part
        </button>
      </div>
    </div>
  );
};

export default Card;
