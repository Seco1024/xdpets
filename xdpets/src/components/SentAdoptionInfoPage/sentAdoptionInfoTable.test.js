import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import axios from "axios";
import SentAdoptionInfoTable from "./sentAdoptionInfoTable";
import { BrowserRouter as Router } from "react-router-dom";
import { UidProvider } from "../UidContext";

// Mock axios
jest.mock("axios");

const mockPets = [
  {
    pet_id: 1,
    pet_name: "Bella",
    category: "Dog",
    breed: "Labrador",
    gender: "Female",
    age: 3
  },
  {
    pet_id: 2,
    pet_name: "Max",
    category: "Cat",
    breed: "Siamese",
    gender: "Male",
    age: 2
  }
];

beforeEach(() => {
  axios.get.mockResolvedValue({ data: { PetInformation: mockPets } });
});

test("renders pet table and handles pagination", async () => {
  render(
    <Router>
      <UidProvider value={{ uid: "test-uid" }}>
        <SentAdoptionInfoTable />
      </UidProvider>
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Bella")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  // Check pagination controls
  expect(screen.getByText("Rows per page:")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Rows per page:"), {
    target: { value: "50" }
  });

  await waitFor(() => {
    expect(screen.getByText("Bella")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });
});

test("handles edit and delete actions", async () => {
  render(
    <Router>
      <UidProvider value={{ uid: "test-uid" }}>
        <SentAdoptionInfoTable />
      </UidProvider>
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Bella")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  // Simulate edit button click
  fireEvent.click(screen.getAllByLabelText("edit")[0]);
  expect(screen.getByText("Edit pet with pet_id: 1")).toBeInTheDocument();

  // Simulate delete button click
  fireEvent.click(screen.getAllByLabelText("delete")[0]);
  expect(screen.getByText("Delete pet with pet_id: 1")).toBeInTheDocument();
});

test("displays snackbar on successful delete", async () => {
  axios.post.mockResolvedValue({ status: 200 });

  render(
    <Router>
      <UidProvider value={{ uid: "test-uid" }}>
        <SentAdoptionInfoTable />
      </UidProvider>
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Bella")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  // Simulate delete button click
  fireEvent.click(screen.getAllByLabelText("delete")[0]);
  fireEvent.click(screen.getByText("Confirm")); // Assuming "Confirm" is the text on the confirm button

  await waitFor(() => {
    expect(screen.getByText("刪除成功")).toBeInTheDocument();
  });
});
