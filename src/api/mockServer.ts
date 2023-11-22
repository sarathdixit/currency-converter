import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Define currency codes as a union type
type CurrencyCode = "USD" | "INR" | "EUR";

// Define the structure of exchange rates
interface ExchangeRate {
  [key: string]: number;
}

interface ExchangeRates {
  [key: string]: ExchangeRate;
}

const mock = new MockAdapter(axios);

mock.onPost("/convert").reply((config) => {
  const { sourceCurrency, targetCurrency, amount } = JSON.parse(
    config.data
  ) as {
    sourceCurrency: CurrencyCode;
    targetCurrency: CurrencyCode;
    amount: number;
  };

  const exchangeRates: ExchangeRates = {
    USD: { INR: 74, EUR: 0.85 },
    INR: { USD: 0.013, EUR: 0.011 },
    EUR: { USD: 1.17, INR: 88 },
  };

  const exchangeRate = exchangeRates[sourceCurrency]?.[targetCurrency];
  if (exchangeRate === undefined) {
    return [400, { message: "Invalid currency pair" }];
  }

  const convertedAmount = amount * exchangeRate;

  const conversionRecord = {
    sourceCurrency,
    targetCurrency,
    amount,
    exchangeRate,
    convertedAmount,
  };

  return [200, conversionRecord];
});
