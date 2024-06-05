import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function ConfirmationDialog({ open, onClose, onConfirm, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>請確認操作，此操作不可撤銷</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          否
        </Button>
        <Button onClick={onConfirm} color="secondary">
          是
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
