import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ContactCard from './contactCard';
import { UidContext } from '../UidContext';

jest.mock('axios');

const mockUidContextValue = { uid: 'test-uid' };

describe('ContactCard', () => {
  it('renders login prompt when user is not logged in', () => {
    render(
      <UidContext.Provider value={{ uid: null }}>
        <ContactCard owner_id="test-owner-id" />
      </UidContext.Provider>
    );

    expect(screen.getByText('登入後可查看聯絡資訊')).toBeInTheDocument();
  });

  it('fetches and displays contact information when user is logged in', async () => {
    const contactInfo = {
      username: 'John Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
    };

    axios.get.mockResolvedValueOnce({ data: { data: contactInfo } });

    render(
      <UidContext.Provider value={mockUidContextValue}>
        <ContactCard owner_id="test-owner-id" />
      </UidContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('聯絡人: John Doe')).toBeInTheDocument();
      expect(screen.getByText('連絡電話: 123-456-7890')).toBeInTheDocument();
      expect(screen.getByText('信箱: john.doe@example.com')).toBeInTheDocument();
    });
  });

  it('displays error message when contact information cannot be fetched', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching contact info'));

    render(
      <UidContext.Provider value={mockUidContextValue}>
        <ContactCard owner_id="test-owner-id" />
      </UidContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('無法獲取聯絡資訊')).toBeInTheDocument();
    });
  });
});
