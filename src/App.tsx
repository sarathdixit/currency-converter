import React from "react";
import Styles from "./App.module.scss";
import CurrencyConverterForm from "./componets/CurrencyConverterForm/CurrencyConverterForm";

const App: React.FC = () => {
  return (
    <div className={Styles.container}>
      <main>
        <h1>Currency Converter</h1>
        <CurrencyConverterForm />
      </main>
    </div>
  );
};

export default App;
