import * as React from 'react';
import PropTypes from 'prop-types';
import HighlightsIntro from '../components/HighlightsIntro';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Highlights from '../components/LandingPage/Highlights';
import HighlightsReason from '../components/LandingPage/HighlightsReason';
import Testimonials from '../components/LandingPage/Testimonials';
import Footer from '../components/Footer';
import getLPTheme from '../components/LandingPage/getLPTheme';
import AppBar from '../components/AppBar';


export default function LandingPage() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });



  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />      
      <AppBar />
      <Box sx={{ bgcolor: 'background.default' }}>
        <HighlightsIntro title="寵物領養平台" description="我們正在建立一個平台，提供動物送養和領養服務，甚至還包括為領養者提供媒合服務。我們希望這個平台能夠幫助更多流浪動物找到合適的家，同時也讓想領養的人更容易找到心儀的寵物。這個平台將會提供動物的詳細信息，並允許用戶提交領養申請。"/>
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <HighlightsReason />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
