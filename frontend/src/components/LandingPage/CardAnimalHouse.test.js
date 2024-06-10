import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardAnimalHouse from './CardAnimalHouse';  // Adjust the import path as necessary

describe('CardAnimalHouse Component', () => {
  const animalHouseProps = {
    title: 'Cute Puppies',
    imgUrl: 'http://example.com/puppy.jpg',
    website: 'http://example.com/more-info',
  };

  it('renders correctly', () => {
    render(<CardAnimalHouse {...animalHouseProps} />);
    expect(screen.getByText('Cute Puppies')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /cute puppies/i })).toHaveAttribute('src', 'http://example.com/puppy.jpg');
    expect(screen.getByText('Learn More')).toHaveAttribute('href', 'http://example.com/more-info');
  });

  it('handles share button click when share API is supported', () => {
    global.navigator.share = jest.fn(() => Promise.resolve());
    const consoleSpy = jest.spyOn(console, 'log');

    render(<CardAnimalHouse {...animalHouseProps} />);
    fireEvent.click(screen.getByText('Share'));

    expect(navigator.share).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('分享成功');
  });

  it('handles share button failure', () => {
    global.navigator.share = jest.fn(() => Promise.reject(new Error('分享失敗')));
    const consoleSpy = jest.spyOn(console, 'error');

    render(<CardAnimalHouse {...animalHouseProps} />);
    fireEvent.click(screen.getByText('Share'));

    expect(navigator.share).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('分享失敗', expect.any(Error));
  });
});