import * as React from "react";
import HighlightsIntro from "../components/HighlightsIntro";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PaperMain from "../components/Paper";
import Footer from "../components/Footer";
import getLPTheme from "../components/LandingPage/getLPTheme";
import AppBar from "../components/AppBar";
import Pagination from "@mui/material/Pagination";
import { Container } from "@mui/material";
import CardArea from "../components/MainPage/CardArea";

export default function MainPage() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ bgcolor: "background.default" }}>
        <HighlightsIntro title="寵物認養" description="首頁 -> 寵物認養" />
        <Divider />
        <PaperMain description="此區的送養動物均由送養人刊登，所有送養人電話均經過簡訊驗證，如有任何領養、認養問題請直接與送養人聯繫。領養前請謹慎考慮，不隨意棄養。重要提醒！ 自即日起，查看領養資訊均需驗證手機號碼，且每次查看均會記錄相關登入資訊，請有他意者自重。本站紀錄之相關個人訊息均僅供檢察或司法警察機關調閱，不會提供給任何第三方使用" />
        <CardArea />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
