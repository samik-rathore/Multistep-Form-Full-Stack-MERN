import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Destructure props
const ThirdStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { productName, price, orderID, date, name, phoneNumber, email, address, paymentDetails },
  formErrors
}) => {
  const PostData = async (e) => {
    e.preventDefault();
  
    const res = await fetch("/submit",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        productName,price,orderID,date,name,phoneNumber,email,address,paymentDetails
      })
    })
  
    const data = await res.json();
  
    if (data.status === 201){
      window.alert("Data Submitted Successfully");
      console.log("success");
    }
    handleNext();
  };
  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Payment Details"
            name="paymentDetails"
            placeholder="Payment Details"
            type="paymentDetails"
            value={paymentDetails || ""}
            onChange={handleChange}
            margin="normal"
            error={!!formErrors.paymentDetails}
            helperText={formErrors.paymentDetails}
            required
          />
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          color="secondary"
          onClick={PostData}
        >
          Finish
        </Button>
      </div>
    </Fragment>
  );
};

export default ThirdStep;
