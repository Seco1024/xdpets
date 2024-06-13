import * as React from "react";
import HighlightsIntro from "../components/HighlightsIntro";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../components/Footer";
import getLPTheme from "../components/LandingPage/getLPTheme";
import AppBar from "../components/AppBar";
import PetArea from "../components/PetDetailPage/PetArea";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export default function PetDetails() {
  const { petId } = useParams();
  const [catData, setCatData] = React.useState({});
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get(
          `http://backend:8000/pet/getPet/?pet_id=${petId}`
        );

        if (response.status == 200) {
          setCatData(response.data["PetInformation"]);
        }
      } catch (error) {
        console.error("Error fetching cat data:", error);
      }
    };

    fetchCatData();
  }, []);

  const headline = catData["pet_name"]
    ? `首頁 -> 寵物認養 -> ${catData["pet_name"]}`
    : "首頁 -> 寵物認養";
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ bgcolor: "background.default" }}>
        <HighlightsIntro title="寵物認養" description={headline} />
        <Divider />
        <PetArea catData={catData} />

        <Divider
          sx={{
            width: "80%",
            margin: "auto",
          }}
        />
        <Container>
          <Box
            sx={{
              padding: 4,
              ml: 2,
              mt: 5,
              mb: 5,
            }}
          >
            <Typography variant="body">{catData["info"]}</Typography>
          </Box>
        </Container>
        <Divider sx={{ width: "80%", margin: "auto" }} />

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
