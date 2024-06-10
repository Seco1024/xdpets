import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import axios from "axios";
import MatchTable from "./matchTable";

jest.mock("axios");

const mockPreferences = [
  {
    preferenceId: 1,
    status: "未通知",
    category: "貓",
    breed: "Siamese",
    region: "Taipei",
    gender: "公",
    age: 2,
    size: "中",
    ligated: true,
    coat_color: "白色",
  },
  {
    preferenceId: 2,
    status: "已通知",
    category: "狗",
    breed: "Labrador",
    region: "Kaohsiung",
    gender: "母",
    age: 3,
    size: "大",
    ligated: false,
    coat_color: "黑色",
  },
];

describe("MatchTable Component", () => {
  test("renders MatchTable component", () => {
    render(<MatchTable preferences={mockPreferences} />);
    expect(screen.getByText("狀態")).toBeInTheDocument();
    expect(screen.getByText("種類")).toBeInTheDocument();
  });

  test("displays the correct number of rows", () => {
    render(<MatchTable preferences={mockPreferences} />);
    expect(screen.getAllByRole("row").length).toBe(mockPreferences.length + 1); // including header row
  });

  test("handles edit action correctly", async () => {
    render(<MatchTable preferences={mockPreferences} />);
    fireEvent.click(screen.getAllByLabelText("Edit")[0]);
    expect(screen.getByText("Edit Dialog")).toBeInTheDocument();
  });

  test("handles delete action correctly", async () => {
    axios.post.mockResolvedValue({ status: 200 });

    render(<MatchTable preferences={mockPreferences} />);
    fireEvent.click(screen.getAllByLabelText("Delete")[0]);
    expect(screen.getByText("Delete Dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(screen.getByText("刪除成功")).toBeInTheDocument();
    });
  });

  test("handles delete action failure", async () => {
    axios.post.mockRejectedValue({ response: { message: "Preference not found" } });

    render(<MatchTable preferences={mockPreferences} />);
    fireEvent.click(screen.getAllByLabelText("Delete")[0]);
    expect(screen.getByText("Delete Dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(screen.getByText("無此偏好")).toBeInTheDocument();
    });
  });
});
