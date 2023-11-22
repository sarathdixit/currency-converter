import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, MenuItem, LinearProgress } from "@mui/material";
import "../../api/mockServer";
import Styles from "./CurrencyConverterForm.module.scss";

// Define the form fields interface
interface ConversionValues {
  sourceCurrency: string;
  targetCurrency: string;
  amount: number;
}

// Define the API response interface
interface ConversionResult {
  convertedAmount: number;
  sourceCurrency: string;
  targetCurrency: string;
}

// Validation schema
const validationSchema = Yup.object({
  sourceCurrency: Yup.string().required("Source currency is required"),
  targetCurrency: Yup.string()
    .required("Target currency is required")
    .notOneOf(
      [Yup.ref("sourceCurrency")],
      "Target currency must be different from source currency"
    ),
  amount: Yup.number()
    .min(1, "Amount must be at least 1")
    .required("Amount is required"),
});

const CurrencyConverterForm: React.FC = () => {
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<ConversionValues>({
    sourceCurrency: "",
    targetCurrency: "",
    amount: 0,
  });

  useEffect(() => {
    const submit = async () => {
      if (
        formValues.sourceCurrency &&
        formValues.targetCurrency &&
        formValues.amount > 0 &&
        formValues.sourceCurrency !== formValues.targetCurrency
      ) {
        setSubmitting(true);
        try {
          const response = await axios.post("/convert", formValues);
          const data: ConversionResult = response.data;
          setConversionResult(
            `Converted Amount: ${data.convertedAmount} ${formValues.targetCurrency}`
          );
        } catch (error) {
          console.error("Error in conversion:", error);
          setConversionResult("Conversion failed");
        }
        setSubmitting(false);
      }
    };

    submit();
  }, [formValues]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={Styles.formWrapper}>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => setFormValues(values)}
      >
        {() => (
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => setFormValues(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={Styles.selectionWrapper}>
                  <Field
                    name="sourceCurrency"
                    as={TextField}
                    select
                    label="Source Currency"
                    fullWidth
                    margin="normal"
                    error={errors.sourceCurrency && touched.sourceCurrency}
                    helperText={
                      errors.sourceCurrency && touched.sourceCurrency
                        ? errors.sourceCurrency
                        : null
                    }
                    onChange={handleChange}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                  </Field>

                  <Field
                    name="targetCurrency"
                    as={TextField}
                    select
                    label="Target Currency"
                    fullWidth
                    margin="normal"
                    error={errors.targetCurrency && touched.targetCurrency}
                    helperText={
                      errors.targetCurrency && touched.targetCurrency
                        ? errors.targetCurrency
                        : null
                    }
                    onChange={handleChange}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                  </Field>
                </div>

                <Field
                  name="amount"
                  as={TextField}
                  type="number"
                  label="Amount"
                  fullWidth
                  margin="normal"
                  error={errors.amount && touched.amount}
                  helperText={
                    errors.amount && touched.amount ? errors.amount : null
                  }
                  onChange={handleChange}
                />

                {isSubmitting && <LinearProgress />}
                {conversionResult && (
                  <div className={Styles.result}>{conversionResult}</div>
                )}
              </Form>
            )}
          </Formik>
        )}
      </Formik>
    </div>
  );
};

export default CurrencyConverterForm;
