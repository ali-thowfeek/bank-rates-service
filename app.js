var express = require("express");
var app = express();
var fs = require("fs");

const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.post("/rates", function (req, res) {
  const { bankIds, currencyId, date } = req.body;
  console.log("req.body", req.body);

  // const formatedDate = date || new Date().toISOString().substring(0, 10);

  //TODO: rewrite with sequilize
});

app.get("/banks", function (req, res) {
  //TODO: rewrite with sequilize
  db.all("SELECT * FROM bank", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/currencies", function (req, res) {
  //TODO: rewrite with sequilize
  db.all("SELECT * FROM currency", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
