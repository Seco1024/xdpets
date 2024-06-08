import React from "react";
import { render, screen } from "@testing-library/react";
import UserInfoTable from "./UserInfoTable";

// Mocking the ConfirmationDialog and DetailsDialog components
jest.mock("../ConfirmationDialog", () => () => <div>ConfirmationDialog Component</div>);
jest.mock("./DetailDialog", () => () => <div>DetailsDialog Component</div>);

test("renders UserInfoTable component with correct subcomponents", () => {
  render(<UserInfoTable />);

  // Check if the table headers are rendered
  expect(screen.getByText("Actions")).toBeInTheDocument();
  expect(screen.getByText("Status")).toBeInTheDocument();
  expect(screen.getByText("User ID")).toBeInTheDocument();

  // Check if ConfirmationDialog and DetailsDialog are rendered
  expect(screen.getByText("ConfirmationDialog Component")).toBeInTheDocument();
  expect(screen.getByText("DetailsDialog Component")).toBeInTheDocument();
});