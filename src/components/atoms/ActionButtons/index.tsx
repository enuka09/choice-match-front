import React from "react";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ActionButtonsProps {
  onView?: () => void; // Make onView optional
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onView, onEdit, onDelete }) => (
  <React.Fragment>
    {onView && (
      <Button
        sx={{
          backgroundColor: "#3498db",
          "&:hover": {
            backgroundColor: "#2980b9",
          },
          marginRight: "10px",
        }}
        size="small"
        onClick={onView}
      >
        <Visibility sx={{ color: "white" }} />
      </Button>
    )}
    <Button
      sx={{
        backgroundColor: "#2ecc71",
        "&:hover": {
          backgroundColor: "#27ae60",
        },
        marginRight: "10px",
      }}
      size="small"
      onClick={onEdit}
    >
      <Edit sx={{ color: "white" }} />
    </Button>
    <Button
      sx={{
        backgroundColor: "#e74c3c",
        "&:hover": {
          backgroundColor: "#c0392b",
        },
      }}
      size="small"
      onClick={onDelete}
    >
      <Delete sx={{ color: "white" }} />
    </Button>
  </React.Fragment>
);

export default ActionButtons;
