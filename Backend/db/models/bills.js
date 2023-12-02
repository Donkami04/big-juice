const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Bills = sequelize.define(
  "Bills",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "bills",
    timestamps: false,
  }
);

module.exports = { Bills };

