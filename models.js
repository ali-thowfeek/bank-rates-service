const { DataTypes } = require("sequelize");
const db = require("./db");

const Bank = db.define(
  "bank",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "bank",
    timestamps: false,
  }
);

const Currency = db.define(
  "currency",
  {
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
  },
  {
    tableName: "currency",
    timestamps: false,
  }
);

const BankRate = db.define(
  "bank_rate",
  {
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
  },
  {
    tableName: "bank_rate",
    timestamps: false,
  }
);

BankRate.belongsTo(Bank, { foreignKey: "bank_id" });
BankRate.belongsTo(Currency, { foreignKey: "currency_id" });

module.exports = { Bank, Currency, BankRate };
