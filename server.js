const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = process.env.PORT || 3001;
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "https://bitcoincalc-86821bc3d940.herokuapp.com",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

app.get("/favicon.ico", (req, res) => {
  res.redirect("/");
});

app.post("/convert", (req, res) => {
  const amount = req.body.amount;
  const crypto = req.body.currentCrypto;
  const fiat = req.body.currentFiat;

  if (amount && crypto && fiat) {
    var options = {
      url: "https://rest.coinapi.io/v1/exchangerate/" + crypto + "/" + fiat,
      headers: {
        "X-CoinAPI-Key": process.env.API_KEY,
      },
    };
    request(options, (error, response, body) => {
      const cryptoData = JSON.parse(body);
      global.finalRate = amount * cryptoData.rate;
      res.status(200).send(finalRate.toString());
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
