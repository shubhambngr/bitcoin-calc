import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

function Currency(props) {
  const [currency, setCurrency] = useState("");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    props.valueTransfer(event.target.value, event.target.name);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <TextField
        id="standard-select-currency"
        select
        name={props.type}
        value={currency}
        onChange={handleCurrencyChange}
        helperText="Please select your currency"
      >
        {props.currencies.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default Currency;
