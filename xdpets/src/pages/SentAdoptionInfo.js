import * as React from "react";
import HighlightsIntro from "../components/HighlightsIntro.js";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../components/Footer.js";
import getLPTheme from "../components/LandingPage/getLPTheme.js";
import AppBar from "../components/AppBar.js";
import SentAdoptionInfoTable from "../components/SentAdoptionInfoPage/sentAdoptionInfoTable.js";
import Container from "@mui/material/Container";

export default function SentAdoptionInfo() {
  const [mode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ bgcolor: "background.default" }}>
        <HighlightsIntro title="送養資訊" description="首頁 -> 會員中心 -> 送養資訊" />
        <Container sx={{ mt: 5 }}>
          <SentAdoptionInfoTable />
        </Container>
        <Divider sx={{ mt: 5 }}/>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
