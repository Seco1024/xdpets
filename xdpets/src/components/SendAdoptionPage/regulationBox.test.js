import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegulationBox from './RegulationBox';

describe('RegulationBox Component', () => {
  test('renders the component and checks initial content', () => {
    render(<RegulationBox setIsCheckboxChecked={() => {}} />);

    // 檢查標題是否正確顯示
    expect(screen.getByText('Regulations for Sending Pets')).toBeInTheDocument();

    // 檢查條款段落是否正確顯示
    expect(screen.getByText(/刊登人使用由 Wepet 寵物資訊平台/i)).toBeInTheDocument();
    expect(screen.getByText(/Wepet 要求所有刊登送養資訊及查看送養資訊者/i)).toBeInTheDocument();
    expect(screen.getByText(/送養資訊不限刊登時間，因此將動物確定送養後請回網站關閉送養資訊/i)).toBeInTheDocument();
    expect(screen.getByText(/目前不開放剛出生或尚未開眼之動物送養/i)).toBeInTheDocument();
    expect(screen.getByText(/Wepet 僅為資訊交流平台，無法保證刊登內容之正確性/i)).toBeInTheDocument();
    expect(screen.getByText(/Wepet 對刊登資訊保有最終篩選、修改、刪除及決定刊登與否之權利/i)).toBeInTheDocument();
    expect(screen.getByText(/Wepet 秉持以領養代替購買之精神，禁止以下類型之刊登內容/i)).toBeInTheDocument();
    expect(screen.getByText(/刊登人應確定刊登之內容未使用未經授權之文字、圖片、影音或任何形式之資訊/i)).toBeInTheDocument();
    expect(screen.getByText(/刊登人同意授權於本服務刊登之資訊內容無償提供第三人分享、轉載或推廣/i)).toBeInTheDocument();
    expect(screen.getByText(/資訊的審核時間約為 0 - 3 天，請耐心等候/i)).toBeInTheDocument();

    // 檢查勾選框是否存在
    expect(screen.getByRole('checkbox', { name: /我已詳閱且同意本刊登條款/i })).toBeInTheDocument();
  });

  test('calls setIsCheckboxChecked when checkbox is clicked', () => {
    const setIsCheckboxChecked = jest.fn();
    render(<RegulationBox setIsCheckboxChecked={setIsCheckboxChecked} />);

    const checkbox = screen.getByRole('checkbox', { name: /我已詳閱且同意本刊登條款/i });
    
    // 初始勾選狀態應為未勾選
    expect(checkbox.checked).toBe(false);

    // 模擬點擊勾選框
    fireEvent.click(checkbox);

    // 檢查是否調用了 setIsCheckboxChecked 並且參數為 true
    expect(setIsCheckboxChecked).toHaveBeenCalledWith(true);

    // 模擬再次點擊勾選框
    fireEvent.click(checkbox);

    // 檢查是否調用了 setIsCheckboxChecked 並且參數為 false
    expect(setIsCheckboxChecked).toHaveBeenCalledWith(false);
  });
});
