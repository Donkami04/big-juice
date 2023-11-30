const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = { Users };
