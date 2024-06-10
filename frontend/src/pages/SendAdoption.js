import * as React from "react";
import HighlightsIntro from "../components/HighlightsIntro.js";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../components/Footer.js";
import getLPTheme from "../components/LandingPage/getLPTheme.js";
import AppBar from "../components/AppBar.js";
import SendAdoptionBox from "../components/SendAdoptionPage/sendAdoptionBox.js";
import RegulationBox from "../components/SendAdoptionPage/regulationBox.js";
import { Container, Grid } from '@mui/material';

export default function SentAdoptionInfo() {
  const [mode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ bgcolor: "background.default" }}>
        <HighlightsIntro title="刊登送養" description="首頁 -> 刊登送養" />
        <Container sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <SendAdoptionBox isCheckboxChecked={isCheckboxChecked} />
            </Grid>
            <Grid item xs={12} md={4}>
              <RegulationBox setIsCheckboxChecked={setIsCheckboxChecked} />
            </Grid>
          </Grid>
        </Container>
        <Divider sx={{ mt: 5 }} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
