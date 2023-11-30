const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Ingredients = sequelize.define(
  "Ingredients",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "ingredients",
    timestamps: false,
  }
);

module.exports = { Ingredients };

