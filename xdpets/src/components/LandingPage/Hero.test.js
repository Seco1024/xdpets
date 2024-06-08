import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Hero from './Hero'; // 確保正確導入你的 Hero 組件

// 定義一個淺色模式的主題
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5'
    }
  }
});

describe('Hero component', () => {
  test('renders Hero component correctly', () => {
    // 使用 ThemeProvider 確保組件中的主題相關功能能正確運作
    render(
      <ThemeProvider theme={theme}>
        <Hero />
      </ThemeProvider>
    );

    // 檢查是否正確渲染了標題
    expect(screen.getByText(/寵物領養平台/)).toBeInTheDocument();

    // 檢查是否包含描述性文字
    expect(screen.getByText(/我們正在建立一個平台，提供動物送養和領養服務，甚至還包括為領養者提供媒合服務。/)).toBeInTheDocument();
  });
});