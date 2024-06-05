import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function DeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>確認刪除</DialogTitle>
      <DialogContent>
        <Typography>您確定要刪除此條目嗎？此操作不可撤銷。</Typography>
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

export default DeleteDialog;
