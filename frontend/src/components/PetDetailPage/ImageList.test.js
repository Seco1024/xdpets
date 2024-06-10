import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImageList from './ImageList';

const catData = {
  images_urls: [
    "/images/cat1.jpg",
    "/images/cat2.jpg",
    "/images/cat3.jpg",
  ],
};

describe('ImageList', () => {
  test('renders image list with the provided data', () => {
    render(<ImageList catData={catData} />);

    // Check if images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(catData.images_urls.length + 1); // +1 for the selected image

    // Check if the first image is selected by default
    const selectedImage = screen.getByAltText('Selected');
    expect(selectedImage).toHaveAttribute('src', catData.images_urls[0]);
  });

  test('changes selected image on click', () => {
    render(<ImageList catData={catData} />);

    // Click on the second image
    const secondImage = screen.getAllByAltText('Thumbnail 1')[0];
    fireEvent.click(secondImage);

    // Check if the second image is selected
    const selectedImage = screen.getByAltText('Selected');
    expect(selectedImage).toHaveAttribute('src', catData.images_urls[1]);
  });

  test('updates opacity on hover', () => {
    render(<ImageList catData={catData} />);

    const images = screen.getAllByAltText(/Thumbnail/);

    // Hover over the first image
    fireEvent.mouseOver(images[0]);
    expect(images[0]).toHaveStyle('opacity: 1');

    // Hover over the second image
    fireEvent.mouseOver(images[1]);
    expect(images[1]).toHaveStyle('opacity: 1');

    // Move mouse out of second image
    fireEvent.mouseOut(images[1]);
    expect(images[1]).toHaveStyle('opacity: 0.5'); // Assuming it's not selected
  });
});
