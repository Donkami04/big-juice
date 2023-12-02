const sequelize = require("../conection");
const { Sequelize, DataTypes } = require("sequelize");

const Products = sequelize.define(
  "Products",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    hielo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    leche: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    leche_polvo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    azucar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    pulpa: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    saborizante: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    canela: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    miel: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue : 0
    },
    tarrina: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue : 0
    },
    pitillo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue : 0
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = { Products };

