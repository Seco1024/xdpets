import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SendAdoptionBox from "./editSentAdoptionInfoBox";

// Mocking axios
const mock = new MockAdapter(axios);
mock.onGet("YOUR_API_URL/getPetDetails").reply(200, {
  petname: "Buddy",
  breed: "Golden Retriever",
  type: "dog",
  gender: "male",
  size: "large",
  haircolor: "Golden",
  age: "3 years",
  ligation: "yes",
  city: "Taipei",
  area: "Daan",
  discription: "Friendly and energetic",
  name: "John Doe",
  phonenumber: "0987654321",
  love_adoption_book: "yes",
  accept_followup: "yes",
  adult_or_not: "yes",
  family_agrees: "yes",
  photos: ["https://http.cat/301", "https://http.cat/302"],
  petId: "12345"
});

test("renders SendAdoptionBox component", async () => {
  render(
    <Router>
      <UidProvider value={{ uid: "test-uid" }}>
        <SendAdoptionBox defaultValues={{}} />
      </UidProvider>
    </Router>
  );

  // Check if the form fields are rendered
  expect(screen.getByLabelText(/Pet Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Breed/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Size/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Hair Color/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Ligation/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Area/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Love Adoption Book/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Accept Follow-up/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Adult or Not/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Family Agrees/i)).toBeInTheDocument();

  // Simulate user interactions
  fireEvent.change(screen.getByLabelText(/Pet Name/i), { target: { value: 'Buddy' } });
  fireEvent.change(screen.getByLabelText(/Breed/i), { target: { value: 'Golden Retriever' } });
  fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'dog' } });
  fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
  fireEvent.change(screen.getByLabelText(/Size/i), { target: { value: 'large' } });
  fireEvent.change(screen.getByLabelText(/Hair Color/i), { target: { value: 'Golden' } });
  fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '3 years' } });
  fireEvent.change(screen.getByLabelText(/Ligation/i), { target: { value: 'yes' } });
  fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Taipei' } });
  fireEvent.change(screen.getByLabelText(/Area/i), { target: { value: 'Daan' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Friendly and energetic' } });
  fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '0987654321' } });
  fireEvent.change(screen.getByLabelText(/Love Adoption Book/i), { target: { value: 'yes' } });
  fireEvent.change(screen.getByLabelText(/Accept Follow-up/i), { target: { value: 'yes' } });
  fireEvent.change(screen.getByLabelText(/Adult or Not/i), { target: { value: 'yes' } });
  fireEvent.change(screen.getByLabelText(/Family Agrees/i), { target: { value: 'yes' } });

  // Check if the form values are updated correctly
  expect(screen.getByLabelText(/Pet Name/i)).toHaveValue('Buddy');
  expect(screen.getByLabelText(/Breed/i)).toHaveValue('Golden Retriever');
  expect(screen.getByLabelText(/Type/i)).toHaveValue('dog');
  expect(screen.getByLabelText(/Gender/i)).toHaveValue('male');
  expect(screen.getByLabelText(/Size/i)).toHaveValue('large');
  expect(screen.getByLabelText(/Hair Color/i)).toHaveValue('Golden');
  expect(screen.getByLabelText(/Age/i)).toHaveValue('3 years');
  expect(screen.getByLabelText(/Ligation/i)).toHaveValue('yes');
  expect(screen.getByLabelText(/City/i)).toHaveValue('Taipei');
  expect(screen.getByLabelText(/Area/i)).toHaveValue('Daan');
  expect(screen.getByLabelText(/Description/i)).toHaveValue('Friendly and energetic');
  expect(screen.getByLabelText(/Your Name/i)).toHaveValue('John Doe');
  expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('0987654321');
  expect(screen.getByLabelText(/Love Adoption Book/i)).toHaveValue('yes');
  expect(screen.getByLabelText(/Accept Follow-up/i)).toHaveValue('yes');
  expect(screen.getByLabelText(/Adult or Not/i)).toHaveValue('yes');
  expect(screen.getByLabelText(/Family Agrees/i)).toHaveValue('yes');
});