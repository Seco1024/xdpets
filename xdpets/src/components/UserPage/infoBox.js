import React, { useState, useEffect } from "react";
import { useUid } from "../UidContext"; // Adjust the path if necessary
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box
} from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog"; // Adjust the path if necessary
import axios from "axios"; // Ensure axios is installed and imported

const defaultInfo = { email: "123@example.com", phone: "123456789"};

const User = () => {
  const { uid } = useUid();
  const [userInfo, setUserInfo] = useState(defaultInfo);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    // Fetch user info based on UID
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/info/${uid}`);
        setUserInfo({
          email: response.data.email,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (uid) {
      fetchUserInfo();
    }
  }, [uid]);

  const handleChange = (field) => (event) => {
    setUserInfo({
      ...userInfo,
      [field]: event.target.value,
    });
  };

  const handlePasswordChange = () => {
    // Simulate password change logic here
    if (oldPassword && newPassword) {
      setSnackbarMessage("Password changed successfully!");
      setAlertSeverity("success");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Please fill in both old and new passwords.");
      setAlertSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation and form submission logic here
    setDialogMessage("Are you sure you want to update your information?");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    try {
      await axios.post("http://localhost:8000/user/update", {
        uid,
        email: userInfo.email,
        phone: userInfo.phone,
        oldPassword,
        newPassword,
      });
      setDialogOpen(false);
      setSnackbarMessage("Information updated successfully!");
      setAlertSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setDialogOpen(false);
      setSnackbarMessage("Failed to update information.");
      setAlertSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            User Information
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              label="Email"
              value={userInfo.email}
              onChange={handleChange("email")}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              label="Phone"
              value={userInfo.phone}
              onChange={handleChange("phone")}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="oldPassword"
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="newPassword"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={handlePasswordChange}
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Change Password
            </Button>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update Information
            </Button>
          </Grid>
        </Grid>
      </Box>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmAction}
        message={dialogMessage}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default User;
