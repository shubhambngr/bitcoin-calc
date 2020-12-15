import React, { useState } from "react";
import Axios from "axios";
import "./Form.css";
import CurrencyInput from "./CurrencyInput";
import fiatCurrencies from "./fiatCurrencies";
import cryptoCurrencies from "./cryptoCurrencies";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";

function Form() {
  const [chosenValues, setChosenValues] = useState({
    amount: "",
    currentCrypto: "",
    currentFiat: "",
  });
  const [renderValues, setRenderValues] = useState({});
  const [rateReceived, setRateReceived] = useState(false);

  function currencyChange(value, currencyType) {
    setChosenValues((prevValues) => {
      return {
        ...prevValues,
        [currencyType]: value,
      };
    });
  }

  function amountChange(event) {
    setChosenValues((prevValues) => {
      return {
        ...prevValues,
        amount: event.target.value,
      };
    });
  }

  function handleClick(event) {
    event.preventDefault();
    const url = "https://bitcoincalc.herokuapp.com";
    Axios.post(`${url}/convert`, chosenValues)
      .then(function (response) {
        setRateReceived(true);
        global.convertedRate = response.data.toFixed(2);
        setRenderValues(chosenValues);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="form-container">
      <form autoComplete="off">
        <TextField
          className="convert"
          value={chosenValues.amount}
          onChange={amountChange}
          id="standard-number"
          type="number"
          label="Convert"
          size="small"
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
        />
        <CurrencyInput
          currencies={cryptoCurrencies}
          valueTransfer={currencyChange}
          type="currentCrypto"
        />
        <p className="form-text">to</p>
        <CurrencyInput
          currencies={fiatCurrencies}
          valueTransfer={currencyChange}
          type="currentFiat"
        />
        <br />
        {rateReceived && (
          <Zoom in={true}>
            <h3>
              {renderValues.amount} {renderValues.currentCrypto} will cost{" "}
              {global.convertedRate} {renderValues.currentFiat}
            </h3>
          </Zoom>
        )}
        <br />
        <Zoom in={true}>
          <div className="button">
            <Button onClick={handleClick} variant="contained" type="submit">
              Convert
            </Button>
          </div>
        </Zoom>
      </form>
    </div>
  );
}

export default Form;
