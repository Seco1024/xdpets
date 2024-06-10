import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StandardImageList from './ImageList';

const catData = {
  images_urls: [
    "/images/cat1.jpg",
    "/images/cat2.jpg",
    "/images/cat3.jpg",
  ],
};

describe('StandardImageList', () => {
  test('renders image list with the provided data', () => {
    render(<StandardImageList catData={catData} />);

    // Check if images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(catData.images_urls.length);

    // Check if the first image is selected by default
    const selectedImage = screen.getByAltText('Selected');
    expect(selectedImage).toHaveAttribute('src', 'http://localhost:8000/images/cat1.jpg');
  });

  test('changes selected image on click', () => {
    render(<StandardImageList catData={catData} />);

    // Click on the second image
    const secondImage = screen.getAllByRole('img')[1];
    fireEvent.click(secondImage);

    // Check if the second image is selected
    const selectedImage = screen.getByAltText('Selected');
    expect(selectedImage).toHaveAttribute('src', 'http://localhost:8000/images/cat2.jpg');
  });

  test('updates opacity on hover', () => {
    render(<StandardImageList catData={catData} />);

    const images = screen.getAllByRole('img');

    // Hover over the first image
    fireEvent.mouseOver(images[0]);
    expect(images[0]).toHaveStyle('opacity: 1');

    // Hover over the second image
    fireEvent.mouseOver(images[1]);
    expect(images[1]).toHaveStyle('opacity: 1');

    // Check the opacity of non-selected images
    expect(images[0]).toHaveStyle('opacity: 0.5');
    expect(images[1]).toHaveStyle('opacity: 1');
  });
});
