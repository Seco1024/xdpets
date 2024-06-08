import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(1),
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  "& .MuiTypography-subtitle1": {
    fontWeight: theme.typography.fontWeightBold,
  },
  "& .MuiTypography-body1": {
    marginBottom: theme.spacing(2),
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: "flex-end",
}));

function DetailsDialog({ open, onClose, peopleDetails }) {
  const renderValue = (key, value) => {
    return value;
  };

  // Define the keys you want to exclude
  const excludedKeys = ["pets"];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>
        <InfoIcon />
        詳細資訊
      </StyledDialogTitle>
      <StyledDialogContent dividers>
        <Grid container spacing={2}>
          {Object.entries(peopleDetails)
            .filter(([key]) => !excludedKeys.includes(key))
            .map(([key, value]) => {
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {key}
                  </Typography>
                  <Typography variant="body1">
                    {renderValue(key, value)}
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          關閉
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
}

export default DetailsDialog;
