import React from "react";
import { render, screen } from "@testing-library/react";
import PetInfoTable from "./PetInfoTable";

// Mocking the ConfirmationDialog and DetailsDialog components
jest.mock("../ConfirmationDialog", () => () => <div>ConfirmationDialog Component</div>);
jest.mock("./DetailDialog", () => () => <div>DetailsDialog Component</div>);

const mockData = [
  {
    id: 1,
    status: "正常",
    userID: "0844d0789054469b9daf9f1d4b1d4cd5",
    petID: "pet-1",
    petName: "Pet 1",
  },
  // You can add more mock items here if needed
];

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ status: 200, data: { petList: mockData } })),
  post: jest.fn(() => Promise.resolve({ status: 200 })),
}));

test("renders PetInfoTable component with correct subcomponents", () => {
  render(<PetInfoTable />);

  // Check if the table headers are rendered
  expect(screen.getByText("Actions")).toBeInTheDocument();
  expect(screen.getByText("Status")).toBeInTheDocument();
  expect(screen.getByText("User ID")).toBeInTheDocument();
  expect(screen.getByText("Pet ID")).toBeInTheDocument();
  expect(screen.getByText("Pet Name")).toBeInTheDocument();

  // Check if ConfirmationDialog and DetailsDialog are rendered
  expect(screen.getByText("ConfirmationDialog Component")).toBeInTheDocument();
  expect(screen.getByText("DetailsDialog Component")).toBeInTheDocument();
});