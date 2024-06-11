// MatchTable.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MatchTable from './MatchTable';
import { UidProvider } from '../UidContext';

// Mock axios
const mock = new MockAdapter(axios);

// Mock data
const mockPreferences = [
  {
    preferenceId: 1,
    matched: false,
    category: '貓',
    breed: '波斯貓',
    region: '台北市',
    gender: '公',
    age: 2,
    size: '中',
    ligated: true,
    coat_color: '白色',
  },
  // Add more mock preferences if needed
];

describe('MatchTable', () => {
  beforeEach(() => {
    // Mock the API response
    mock.onPost('http://localhost:8000/match/deletePreference').reply(200, {});
  });

  const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <UidProvider {...providerProps}>{ui}</UidProvider>,
      renderOptions
    );
  };

  it('renders the MatchTable and allows deletion of a preference', async () => {
    const providerProps = {
      value: { uid: '123' },
    };

    renderWithContext(<MatchTable preferences={mockPreferences} />, { providerProps });

    // Check that the data is rendered
    expect(screen.getByText('貓')).toBeInTheDocument();
    expect(screen.getByText('波斯貓')).toBeInTheDocument();

    // Simulate clicking the delete icon
    const deleteButton = screen.getByLabelText('Delete');
    fireEvent.click(deleteButton);

    // Confirm the deletion in the dialog
    const confirmDeleteButton = screen.getByText('確定');
    fireEvent.click(confirmDeleteButton);

    // Wait for the snackbar to appear
    await waitFor(() => screen.getByText('刪除成功'));

    // Check that the preference is removed from the table
    expect(screen.queryByText('波斯貓')).not.toBeInTheDocument();
  });
});
