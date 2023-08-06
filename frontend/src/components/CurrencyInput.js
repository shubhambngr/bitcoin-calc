import React, { useState } from "react";
import {FormControl, Select, InputLabel, MenuItem, makeStyles} from "@material-ui/core";

function Currency(props) {
  const [currency, setCurrency] = useState("");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    props.valueTransfer(event.target.value, event.target.name);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
    }));

  const classes = useStyles();

  let currType = props.type === "currentCrypto" ? "Crypto" : "Fiat";
  let selectPlaceholder = `${currType} Currency`;


  return (
    <div style={{ display: "inline-block" }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-currency" style={{ fontFamily: "Montserrat" }}>
          {selectPlaceholder}
        </InputLabel>
        <Select
          labelId="select-currency"
          id="standard-select-currency"
          name={props.type}
          value={currency}
          onChange={handleCurrencyChange}
          displayEmpty
          style={{ fontFamily: "Montserrat" }}
        >
          {props.currencies.map((option, index) => (
            <MenuItem key={index} value={option.value} style={{fontFamily: "Montserrat"}}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Currency;
