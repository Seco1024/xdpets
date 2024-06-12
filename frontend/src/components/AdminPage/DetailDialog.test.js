import React from "react";
import { render, screen } from "@testing-library/react";
import DetailsDialog from "./DetailDialog";
import '@testing-library/jest-dom/extend-expect';

const mockPetDetails = {
  pet_name: "Fluffy",
  category: "貓",
  breed: "Siamese",
  gender: "母",
  size: "小",
  coat_color: "白色",
  age: "2歲",
  ligated: true,
  region: "台北市",
  post_date: "2023-05-01",
  images_urls: ["/images/cat1.jpg", "/images/cat2.jpg"],
};

test("renders DetailsDialog component with correct data", () => {
  render(<DetailsDialog open={true} onClose={() => {}} petDetails={mockPetDetails} />);

  // Check if the title is rendered
  expect(screen.getByText("詳細資訊")).toBeInTheDocument();

  // Check if pet details are rendered
  expect(screen.getByText("pet_name")).toBeInTheDocument();
  expect(screen.getByText("Fluffy")).toBeInTheDocument();
  expect(screen.getByText("category")).toBeInTheDocument();
  expect(screen.getByText("貓")).toBeInTheDocument();
  expect(screen.getByText("breed")).toBeInTheDocument();
  expect(screen.getByText("Siamese")).toBeInTheDocument();
  expect(screen.getByText("gender")).toBeInTheDocument();
  expect(screen.getByText("母")).toBeInTheDocument();
  expect(screen.getByText("size")).toBeInTheDocument();
  expect(screen.getByText("小")).toBeInTheDocument();
  expect(screen.getByText("coat_color")).toBeInTheDocument();
  expect(screen.getByText("白色")).toBeInTheDocument();
  expect(screen.getByText("age")).toBeInTheDocument();
  expect(screen.getByText("2歲")).toBeInTheDocument();
  expect(screen.getByText("ligated")).toBeInTheDocument();
  expect(screen.getByText("已結紮")).toBeInTheDocument();
  expect(screen.getByText("region")).toBeInTheDocument();
  expect(screen.getByText("台北市")).toBeInTheDocument();
  expect(screen.getByText("post_date")).toBeInTheDocument();
  expect(screen.getByText("2023-05-01")).toBeInTheDocument();

  // Check if images are rendered
  const images = screen.getAllByAltText("暫時找不到這張圖片");
  expect(images).toHaveLength(2);
  expect(images[0]).toHaveAttribute("src", "http://localhost:8000/images/cat1.jpg");
  expect(images[1]).toHaveAttribute("src", "http://localhost:8000/images/cat2.jpg");

  // Check if the close button is rendered
  expect(screen.getByText("關閉")).toBeInTheDocument();
});