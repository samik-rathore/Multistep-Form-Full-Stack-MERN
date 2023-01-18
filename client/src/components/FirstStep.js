import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Destructuring props
const FirstStep = ({
  handleNext,
  handleChange,
  values: { productName, price, orderID,date },
  formErrors
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    productName.length > 0 &&
    !formErrors.productName &&
    price.length > 0 &&
    !formErrors.price &&
    orderID.length > 0 &&
    !formErrors.orderID &&
    date.length > 0;

  return (
    <Fragment>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            placeholder="Product Name"
            margin="normal"
            value={productName || ""}
            onChange={handleChange}
            error={!!formErrors.productName}
            helperText={formErrors.productName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            placeholder="Price"
            margin="normal"
            value={price || ""}
            onChange={handleChange}
            error={!!formErrors.price}
            helperText={formErrors.price}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="OrderID"
            name="orderID"
            placeholder="OrderID"
            type="orderID"
            value={orderID || ""}
            onChange={handleChange}
            margin="normal"
            error={!!formErrors.orderID}
            helperText={formErrors.orderID}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Date"
            name="date"
            type="date"
            defaultValue={date || "1999-12-31"}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          disabled={!isValid}
          color="primary"
          onClick={isValid ? handleNext : null}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default FirstStep;
