import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SentAdoptionInfoTable from './SentAdoptionInfoTable';
import axios from 'axios';
import ConfirmationDialog from './ConfirmationDialog';
import DetailsDialog from './DetailsDialog';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

jest.mock('axios');

describe('SentAdoptionInfoTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches data on mount', async () => {
    const mockData = [
      { id: 1, status: '待審核', userID: 123, petID: 456, petName: 'Luna' },
    ];

    axios.get.mockResolvedValueOnce({
      data: { petList: mockData },
      status: 200,
    });

    render(<SentAdoptionInfoTable />);

    // Wait for async data fetching to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/administrator/getUnjudgedPets', { withCredentials: true });
    expect(screen.getByText('Luna')).toBeInTheDocument();
  });

  test('shows error message on data fetching error', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    render(<SentAdoptionInfoTable />);

    // Wait for async data fetching to complete and error handling to render
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/administrator/getUnjudgedPets', { withCredentials: true });
    expect(screen.getByText('無法獲取詳細資訊')).toBeInTheDocument();
  });

  test('opens confirmation dialog for check action', () => {
    const mockHandleCheck = jest.fn();
    render(<SentAdoptionInfoTable onCheck={mockHandleCheck} />);

    const deleteButton = screen.getByText('刪除');
    fireEvent.click(deleteButton);

    expect(mockHandleCheck).not.toHaveBeenCalled();

    const checkButton = screen.getByText('通過');
    fireEvent.click(checkButton);

    expect(mockHandleCheck).toHaveBeenCalled();
    expect(screen.getByText('你確定要通過')).toBeInTheDocument();
  });

  test('calls handleConfirmAction on dialog confirmation', () => {
    const mockHandleCheck = jest.fn();
    const mockHandleConfirmAction = jest.fn();
    render(
      <SentAdoptionInfoTable
        onCheck={mockHandleCheck}
        handleConfirmAction={mockHandleConfirmAction}
      />
    );

    const checkButton = screen.getByText('通過');
    fireEvent.click(checkButton);

    const confirmButton = screen.getByText('確認');
    fireEvent.click(confirmButton);

    expect(mockHandleConfirmAction).toHaveBeenCalled();
  });

  test('shows success message on approval', () => {
    const mockHandleCheck = jest.fn(() => {
      setSnackbarOpen(true);
      setSnackbarMessage('通過成功');
      setAlertSeverity('success');
    });
    render(<SentAdoptionInfoTable onCheck={mockHandleCheck} />);

    const checkButton = screen.getByText('通過');
    fireEvent.click(checkButton);

    expect(screen.getByText('通過成功')).toBeInTheDocument();
  });

  test('shows error message on approval error', () => {
    const mockHandleCheck = jest.fn(() => {
      setSnackbarOpen(true);
      setSnackbarMessage('通過失敗');
      setAlertSeverity('error');
    });
    render(<SentAdoptionInfoTable onCheck={mockHandleCheck} />);

    const checkButton = screen.getByText('通過');
    fireEvent.click(checkButton);

    expect(screen.getByText('通過失敗')).toBeInTheDocument();
  });
});


