import React from 'react';
import { render, screen } from '@testing-library/react';
import CardArea from './CardArea';

test('renders CardArea component', () => {
  render(<CardArea />);
  // This line is only to make sure the component renders without throwing errors
  expect(screen.getByText('搜尋')).toBeInTheDocument();
});