const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Sales = sequelize.define(
  "Sales",
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    products: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "sales",
    timestamps: false,
  }
);

module.exports = { Sales };
