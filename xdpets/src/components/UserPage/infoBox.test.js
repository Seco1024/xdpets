import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import User from './infoBox';
import { UidContext } from '../UidContext';

jest.mock('axios');

const renderWithContext = (component) => {
  return {
    ...render(
      <UidContext.Provider value={{ uid: '12345' }}>
        {component}
      </UidContext.Provider>
    ),
  };
};

describe('User Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { email: 'test@example.com', phone: '987654321' },
    });
    axios.post.mockResolvedValue({});
  });

  test('renders User component with fetched data', async () => {
    renderWithContext(<User />);

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
      expect(screen.getByLabelText('Phone')).toHaveValue('987654321');
    });
  });

  test('handles input changes', async () => {
    renderWithContext(<User />);

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
      expect(screen.getByLabelText('Phone')).toHaveValue('987654321');
    });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '123123123' } });

    expect(screen.getByLabelText('Email')).toHaveValue('new@example.com');
    expect(screen.getByLabelText('Phone')).toHaveValue('123123123');
  });

  test('displays error snackbar when passwords are not filled', () => {
    renderWithContext(<User />);

    fireEvent.click(screen.getByText('Change Password'));

    expect(screen.getByText('Please fill in both old and new passwords.')).toBeInTheDocument();
  });

  test('displays success snackbar when passwords are filled', () => {
    renderWithContext(<User />);

    fireEvent.change(screen.getByLabelText('Old Password'), { target: { value: 'oldpass' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newpass' } });
    fireEvent.click(screen.getByText('Change Password'));

    expect(screen.getByText('Password changed successfully!')).toBeInTheDocument();
  });

  test('opens confirmation dialog on form submit', () => {
    renderWithContext(<User />);

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText('Are you sure you want to update your information?')).toBeInTheDocument();
  });

  test('displays success snackbar after successful update', async () => {
    renderWithContext(<User />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('Yes'));
    });

    await waitFor(() => {
      expect(screen.getByText('Information updated successfully!')).toBeInTheDocument();
    });
  });

  test('displays error snackbar after failed update', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to update'));

    renderWithContext(<User />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('Yes'));
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to update information.')).toBeInTheDocument();
    });
  });
});