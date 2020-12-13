import React, { useState } from "react";
import "./Form.css";
import CurrencyInput from "./CurrencyInput";
import fiatCurrencies from "./fiatCurrencies";
import cryptoCurrencies from "./cryptoCurrencies";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import Axios from "axios";

function Form() {
  const [amount, setAmount] = useState("");
  const [currentCrypto, setCurrentCrypto] = useState("");
  const [currentFiat, setCurrentFiat] = useState("");
  const [convertedRate, setConvertedRate] = useState("");
  const [rateReceived, setRateReceived] = useState(false);
  const [renderCrypto, setRenderCrypto] = useState("");
  const [renderFiat, setRenderFiat] = useState("");
  const [renderAmount, setRenderAmount] = useState("");

  function cryptoCurrencyChange(crypto) {
    setCurrentCrypto(crypto);
  }

  function fiatCurrencyChange(fiat) {
    setCurrentFiat(fiat);
  }

  function amountChange(event) {
    setAmount(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    const url = "https://bitcoincalc.herokuapp.com";
    const values = {
      amount,
      currentCrypto,
      currentFiat,
    };
    Axios.post(`${url}/convert`, values)
      .then(function (response) {
        setRateReceived(true);
        setConvertedRate(response.data);
        setRenderCrypto(currentCrypto);
        setRenderFiat(currentFiat);
        setRenderAmount(amount);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <form autoComplete="off">
        <TextField
          value={amount}
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
          label="Crypto"
          currencies={cryptoCurrencies}
          valueTransfer={cryptoCurrencyChange}
        />
        <p className="form-text">to</p>
        <CurrencyInput
          label="Fiat"
          currencies={fiatCurrencies}
          valueTransfer={fiatCurrencyChange}
        />
        <br />
        {rateReceived && (
          <Zoom in={true}>
            <h3>
              {renderAmount} {renderCrypto} will cost{" "}
              {Number(convertedRate).toFixed(2)} {renderFiat}
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
