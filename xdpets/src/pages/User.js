import React, { useState } from "react";
import HighlightsIntro from "../components/HighlightsIntro";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import getLPTheme from "../components/LandingPage/getLPTheme";
import AppBar from "../components/AppBar";
import InfoBox from "../components/UserPage/infoBox";

export default function AdminReview() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [status, setStatus] = useState("status1");
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ bgcolor: "background.default" }}>
        <HighlightsIntro
          title="管理員介面"
          description="首頁 -> 會員中心 -> 管理員介面"
        />
        <Divider />
        <Container sx={{ mt: 5 }}>
          <InfoBox />
        </Container>
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
