require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const { Bank, Currency, BankRate } = require("./models");
const { Op } = require("sequelize");
const sequelize = require("./db");

const PORT = 8081;

app.post("/rates", async function (req, res) {
  const { bankIds, currencyId, date } = req.body;

  const formattedDate = date || new Date().toISOString().substring(0, 10);
  const [year, month] = formattedDate.split("-");

  // Calculate the start date of the specified month
  const startDate = `${year}-${month}-01`;

  // Calculate the end date of the specified month
  const lastDayOfMonth = new Date(year, month, 0).getDate(); // Get the last day of the month
  const endDate = `${year}-${month}-${lastDayOfMonth}`;

  try {
    const result = await BankRate.findAll({
      where: {
        bank_id: bankIds,
        currency_id: currencyId,
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          model: Bank,
        },
        {
          model: Currency,
        },
      ],
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/banks", async function (req, res) {
  try {
    const result = await Bank.findAll();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/currencies", async function (req, res) {
  try {
    const result = await Currency.findAll();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
