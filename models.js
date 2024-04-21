const { DataTypes } = require("sequelize");
const db = require("./db");

const Bank = db.define("Bank", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

const Currency = db.define("Currency", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
});

const BankRate = db.define("BankRate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

BankRate.belongsTo(Bank, { foreignKey: "bank_id" });
BankRate.belongsTo(Currency, { foreignKey: "currency_id" });

module.exports = { Bank, Currency, BankRate };
