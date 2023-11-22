import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrencyConverterForm from "./CurrencyConverterForm";

describe("CurrencyConverterForm Tests", () => {
  test("renders the form with all fields and a submit button", () => {
    render(<CurrencyConverterForm />);
    expect(screen.getByLabelText(/Source Currency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Currency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("allows input in the form fields", () => {
    render(<CurrencyConverterForm />);

    const sourceCurrencyInput = screen.getByLabelText(
      /Source Currency/i
    ) as HTMLInputElement;
    const targetCurrencyInput = screen.getByLabelText(
      /Target Currency/i
    ) as HTMLInputElement;
    const amountInput = screen.getByLabelText(/Amount/i) as HTMLInputElement;

    fireEvent.change(sourceCurrencyInput, { target: { value: "USD" } });
    fireEvent.change(targetCurrencyInput, { target: { value: "EUR" } });
    fireEvent.change(amountInput, { target: { value: "100" } });

    expect(sourceCurrencyInput.value).toBe("USD");
    expect(targetCurrencyInput.value).toBe("EUR");
    expect(amountInput.value).toBe("100");
  });

  // Additional tests...
});
