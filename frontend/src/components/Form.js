import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Form.css";
import CurrencyInput from "./CurrencyInput";
import fiatCurrencies from "./fiatCurrencies";
import cryptoCurrencies from "./cryptoCurrencies";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

function Form() {
  const [chosenValues, setChosenValues] = useState({
    amount: 0,
    currentCrypto: "",
    currentFiat: "",
  });
  const [renderValues, setRenderValues] = useState({});
  const [rateReceived, setRateReceived] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const isButtonDisabled =
      chosenValues.amount <= 0 ||
      chosenValues.currentCrypto === "" ||
      chosenValues.currentFiat === "";

    setDisableButton(isButtonDisabled);
  }, [chosenValues]);

  useEffect(() => {
    if (rateReceived) {
      setShowLoader(false);
    }
  }, [rateReceived]);

  function currencyChange(value, currencyType) {
    if (value !== "") {
      setChosenValues((prevState) => {
        return {
          ...prevState,
          [currencyType]: value,
        };
      });
    }
  }

  function amountChange(event) {
    if (Number(event.target.value) > 0) {
      setChosenValues((prevState) => {
        return {
          ...prevState,
          amount: Number(event.target.value),
        };
      });
    }
  }

  function handleClick(event) {
    event.preventDefault();
    setShowLoader(true);
    const url = "https://bitcoincalc-86821bc3d940.herokuapp.com";
    Axios.post(`${url}/convert`, chosenValues)
      .then(function (response) {
        let ans = response;
        console.log(ans);
        if (isNaN(response.data)) ans = "N/A";
        else
          ans = response.data.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          });
        global.convertedRate = ans;

        setRenderValues(chosenValues);
        setRateReceived(true);
      })
      .catch((error) => {
        console.log(error);
        setShowLoader(false);
      });
  }

  return (
    <div className="form-container">
      <form className="main-form" autoComplete="off">
        <div className="input-wrapper">
          <FormControl className="amount-input">
            <InputLabel htmlFor="standard-numberamount">Amount</InputLabel>
            <Input
              id="standard-number"
              type="number"
              value={chosenValues.amount}
              onChange={amountChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <CurrencyInput
            currencies={cryptoCurrencies}
            valueTransfer={currencyChange}
            type="currentCrypto"
          />
          <CurrencyInput
            currencies={fiatCurrencies}
            valueTransfer={currencyChange}
            type="currentFiat"
          />
        </div>
        <br />
        {rateReceived ? (
          <Zoom in={true}>
            <h3>
              {renderValues.amount} {renderValues.currentCrypto} will cost{" "}
              {global.convertedRate} {renderValues.currentFiat}
            </h3>
          </Zoom>
        ) : (
          showLoader && <CircularProgress className="loader" />
        )}
        <br />
        <Zoom in={true}>
          <div className="convert-button-wrapper">
            <button
              className="convert-button"
              onClick={handleClick}
              variant="contained"
              type="submit"
              disabled={disableButton}
            >
              Convert
            </button>
          </div>
        </Zoom>
      </form>
    </div>
  );
}

export default Form;
