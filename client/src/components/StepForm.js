import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import Success from "./Success";
import formValidation from "../Helper/formValidation";

// Step titles
const labels = ["Order Summary", "Customer Details", "Payment"];

const initialValues = {
  productName: "",
  price: "",
  orderID: "",
  date: "",
  name: "",
  phoneNumber: "",
  email:"",
  address:"",
  paymentDetails:"",
  agreement: false
};

const fieldsValidation = {
  productName: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  price: {
    error: "",
    validate: "number",
    minLength: 2,
    maxLength: 20
  },
  orderID: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  date: {},
  name: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20
  },
  phoneNumber: {
    error: "",
    validate: "phone",
    maxLength: 15
  },
  email: {
    error: "",
    validate: "email"
  },
  address: {
    error: "",
    minLength: 3,
    maxLength: 20
  },
  paymentDetails:{
    error: "",
    minLength: 3,
    maxLength: 20
  }, 
  agreement: {
    error: "",
    required: true,
    validate: 'checkbox'
  },
};

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form change
  const handleChange = (e,checked) => {
    const { type, name, value } = e.target;

    const fieldValue = type === "checkbox" ? checked : value;

    // Set values
    setFormValues((prev) => ({
      ...prev,
      [name]: fieldValue
    }));
    console.log(formValues);

    // set errors
    const error = formValidation(name, fieldValue, fieldsValidation) || "";

    setFormErrors({
      [name]: error
    });
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      case 2:
        return (
          < ThirdStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {activeStep === labels.length ? (
        // Last Component
        <Success values={formValues} />
      ) : (
        <>
          <Box style={{ margin: "30px 0 50px" }}>
            <Typography variant="h4" align="center">
              Multi Step Form
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              style={{ margin: "10px 0" }}
            >
              React Material UI multi step form with basic form validation
              logic.
            </Typography>
          </Box>
          <Stepper
            activeStep={activeStep}
            style={{ margin: "30px 0 15px" }}
            alternativeLabel
          >
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep)}
        </>
      )}
    </>
  );
};

export default StepForm;
