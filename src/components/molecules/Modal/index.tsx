import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Modal,
  Box,
  Typography,
  SxProps,
} from "@mui/material";
import { ModalProps } from "./types/interface";

// Admin Modal
export function AdminModal<T>({ open, onClose, onUpdate, onDelete, data, title, mode, renderContent }: ModalProps<T>) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      BackdropProps={{
        style: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        style={{
          backgroundColor: mode === "edit" ? "#19374B" : "default",
        }}
      >
        {renderContent(data)}
      </DialogContent>
      <DialogActions>
        {mode === "delete" && onDelete && (
          <Button onClick={onDelete} color="secondary">
            Confirm
          </Button>
        )}
        {mode === "edit" && onUpdate && (
          <Button onClick={onUpdate} color="success">
            Update
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Client Modal
interface ThemedModalProps {
  open: boolean;
  title: string;
  description: string;
  actions: {
    label: string;
    onClick: () => void;
    icon?: JSX.Element;
    color?: string;
    sx?: SxProps;
  }[];
  onClose?: () => void;
}

export const ThemedModal: React.FC<ThemedModalProps> = ({ open, title, description, actions, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#002137",
          boxShadow: 24,
          p: 8,
          outline: 0,
          borderRadius: "10px",
          color: "white",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "30px", fontWeight: 800, mb: 4, textTransform: "uppercase" }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, fontWeight: 500, fontSize: "18px" }}>
          {description}
        </Typography>
        <div className="flex gap-6">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant="contained"
              sx={{
                py: 2,
                px: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...action.sx,
              }}
            >
              <div className="mb-2">{action.icon}</div>
              {action.label}
            </Button>
          ))}
        </div>
      </Box>
    </Modal>
  );
};
