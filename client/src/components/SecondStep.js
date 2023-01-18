import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

// Destructuring props
const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { name, phoneNumber, email, address, agreement},
  formErrors
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    name.length > 0 &&
    !formErrors.name &&
    email.length > 0 &&
    !formErrors.email&&
    phoneNumber.length > 0 &&
    !formErrors.phoneNumber&&
    address.length > 0 &&
    agreement === true;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={name || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Your email address"
            type="email"
            value={email || ""}
            onChange={handleChange}
            margin="normal"
            error={!!formErrors.email}
            helperText={formErrors.email}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Phone number"
            name="phoneNumber"
            placeholder="i.e: xxx-xxx-xxxx"
            value={phoneNumber || ""}
            onChange={handleChange}
            error={!!formErrors.phoneNumber}
            helperText={formErrors.phoneNumber}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            placeholder="Enter your address"
            value={address || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.address}
            helperText={formErrors.address}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreement.value}
                onChange={handleChange}
                name="agreement"
                color="primary"
                required={agreement.required}
              />
            }
            label="Accept the terms and conditions for rental"
          />
          <FormHelperText error={!!agreement.error}>
            {agreement.error}
          </FormHelperText>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!isValid}
          color="primary"
          onClick={isValid ? handleNext : null}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default SecondStep;
