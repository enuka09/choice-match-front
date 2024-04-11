import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { ModalProps } from "./types/interface";

function Modal<T>({ open, onClose, onUpdate, onDelete, data, title, mode, renderContent }: ModalProps<T>) {
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

export default Modal;
