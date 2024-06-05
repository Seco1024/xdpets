import * as React from "react";
import HighlightsIntro from "../components/HighlightsIntro";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../components/Footer";
import getLPTheme from "../components/LandingPage/getLPTheme";
import AppBar from "../components/AppBar";
import MatchTable from "../components/MatchPage/matchTable";
import Container from "@mui/material/Container";
import axios from "axios";

export default function Match() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [preferences, setPreferences] = React.useState([]);
  const userId = "0844d0789054469b9daf9f1d4b1d4cd5";
  React.useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/match/getPreference?userId=${userId}`
        );
        if (response.status === 200) {
          setPreferences(response.data["preferenceInfo"]);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, [userId]);
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ bgcolor: "background.default" }}>
        <HighlightsIntro
          title="媒合系統"
          description="首頁 -> 會員中心 -> 媒合介面"
        />
        <Container
          sx={{
            mt: 5,
          }}
        >
          <MatchTable preferences={preferences} />
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
