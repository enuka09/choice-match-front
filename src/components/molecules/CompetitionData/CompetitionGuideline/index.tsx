import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CompetitionGuidelines = () => {
  return (
    <Accordion className="guideline-section">
      <AccordionSummary
        className="hover:bg-neutral-500"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="text-primary-700" variant="h6">
          Competition Guidelines
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="ml-10">
          <ol style={{ listStyleType: "numbers" }}>
            <li>
              <b>Eligibility :</b>
            </li>
            <ul className="ml-8" style={{ listStyleType: "circle" }}>
              <li>
                The competition is open to individuals{" "}
                <b>
                  <span style={{ color: "red" }}>aged 18</span>{" "}
                </b>
                and{" "}
                <span style={{ color: "red" }}>
                  <b>above.</b>
                </span>
              </li>
              <li>
                Employees and immediate family members of the organizing company are not eligible to participate.{" "}
              </li>
            </ul>
            <br />
            <li>
              <b>Submission Requirements :</b>
            </li>
            <ul className="ml-8" style={{ listStyleType: "circle" }}>
              <li>Participants must submit their original outfit that has not been published elsewhere.</li>
              <li>Each participant is allowed a maximum of one entry.</li>
              <li>
                Submissions should be in{" "}
                <span style={{ color: "red" }}>
                  <b>JPEG</b>
                </span>{" "}
                or{" "}
                <span style={{ color: "red" }}>
                  <b>PNG</b>
                </span>{" "}
                format, with a minimum resolution of{" "}
                <span style={{ color: "red" }}>
                  <b>1080x1080</b>
                </span>{" "}
                pixels.
              </li>
            </ul>
            <br />
            <li>
              <b>Theme Adherence :</b>
            </li>
            <ul className="ml-8" style={{ listStyleType: "circle" }}>
              <li>
                Entries should strictly adhere to the competition theme. Any deviation may result in disqualification.
              </li>
            </ul>
            <br />
            <li>
              <b>Judging Criteria :</b>
            </li>
            <ul className="ml-8" style={{ listStyleType: "circle" }}>
              <li>Creativity and originality (40%)</li>
              <li>Relevance to the theme (30%)</li>
              <li>Overall aesthetic appeal (30%)</li>
            </ul>
            <br />
            <li>
              <b>Prizes :</b>
            </li>
            <ul className="ml-8" style={{ listStyleType: "circle" }}>
              <li>Winners will be awarded as per the prize structure announced.</li>
              <li>Prizes are non-transferable and cannot be exchanged for cash.</li>
            </ul>
            <br />
            <li>
              <b>Disqualification :</b>
            </li>
            <ul className="ml-8" style={{ listStyleType: "circle" }}>
              <li>
                The organizing company reserves the right to disqualify any participant found violating the competition
                rules or engaging in any form of misconduct.
              </li>
            </ul>
            <br />
            <br />
          </ol>
        </div>
        <div className="ml-6">
          <Typography variant="body1">
            <p className="mb-2">
              <b>Contact</b>
            </p>
          </Typography>
          <Typography variant="body1">
            <p className="mb-4">
              For any queries or clarifications, participants can reach out to{" "}
              <a href="/" className="text-primary-100 underline hover:text-primary-300">
                competition@gmail.com.
              </a>
            </p>
          </Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CompetitionGuidelines;
