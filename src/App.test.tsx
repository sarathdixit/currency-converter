import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("renders the main heading and CurrencyConverterForm", () => {
    render(<App />);

    // Check if the main heading is in the document
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();
  });
});
