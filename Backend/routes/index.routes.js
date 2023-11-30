const express = require("express");
const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const ingredientsRoutes = require("./ingredients.routes");
const categoriesRoutes = require("./categories.routes");
const router = express.Router();

const allRoutes = (app) => {
  app.use("/api/bigjuice", router);
  router.use("/users", usersRoutes);
  router.use("/products", productsRoutes);
  router.use("/ingredients", ingredientsRoutes);
  router.use("/categories", categoriesRoutes);
};

module.exports = { allRoutes };
