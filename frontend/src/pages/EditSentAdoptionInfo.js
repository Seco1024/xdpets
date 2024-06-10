import * as React from "react";
import HighlightsIntro from "../components/HighlightsIntro";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../components/Footer";
import getLPTheme from "../components/LandingPage/getLPTheme";
import AppBar from "../components/AppBar";
import EditSentAdoptionInfoBox from "../components/EditSentAdoptionInfoPage/editSentAdoptionInfoBox.js";
import Container from "@mui/material/Container";
export default function Match() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ bgcolor: "background.default" }}>
        <HighlightsIntro
          title="編輯送養資訊"
          description="首頁 -> 會員中心 -> 編輯送養資訊"
        />
        <Container sx={{ mt: 5, }}>
          <EditSentAdoptionInfoBox />
        </Container>
        <Divider
          sx={{
            mt: 10,
          }}
        />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
