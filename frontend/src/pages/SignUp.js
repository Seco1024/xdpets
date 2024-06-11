import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "../components/AppBar";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        畢業小隊
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "error",
  });
  const navigate = useNavigate();
  const handleSignUp = async (email, password, username, phone) => {
    if (email === "" || password === "" || username === "" || phone === "") {
      setOpenSnackbar({
        open: true,
        message: "Please input email, password, username, and phone",
        severity: "error",
      });
      return;
    }

    try {
      let response = await axios.post(
        "http://localhost:8000/user/signup/",
        qs.stringify({
          email: email,
          password: password,
          username: username,
          phone: phone,
        }),
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;

        if (status === 400) {
          if (message === "電子郵件已存在") {
            setOpenSnackbar({
              open: true,
              message: "電子郵件已存在",
              severity: "error",
            });
          } else if (message === "用戶名已存在") {
            setOpenSnackbar({
              open: true,
              message: "用戶名已存在",
              severity: "error",
            });
          } else if (Array.isArray(message)) {
            setOpenSnackbar({
              open: true,
              message: message.join(", "),
              severity: "error",
            });
          } else {
            setOpenSnackbar({
              open: true,
              message: "請稍後再試",
              severity: "error",
            });
          }
        } else if (status === 500) {
          setOpenSnackbar({
            open: true,
            message: "請稍後再試",
            severity: "error",
          });
        }
      } else {
        console.error(error);
        setOpenSnackbar({
          open: true,
          message: "請稍後再試",
          severity: "error",
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSignUp(
      data.get("email"),
      data.get("password"),
      data.get("Username"),
      data.get("phone")
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Username"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="phone"
                  type="phone"
                  id="phone"
                  autoComplete="new-phone"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar({ open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
