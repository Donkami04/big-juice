const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { ProductsController } = require("../controllers/products.controller");

router.get("/", async (req, res, next) => {
  try {
    const products = await ProductsController.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const productEdit = await ProductsController.editOneProduct(id, changes);
      res.status(productEdit.status).json({
        status: productEdit.status,
        message: productEdit.message,
        error: productEdit.error,
        data: productEdit.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = await ProductsController.createProduct(data);
      res.status(newProduct.status).json({
        status: newProduct.status,
        message: newProduct.message,
        error: newProduct.error,
        data: newProduct.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const productDeleted = await ProductsController.deleteProduct(id);
      res.status(productDeleted.status).json({
        status: productDeleted.status,
        message: productDeleted.message,
        error: productDeleted.error,
        data: productDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post("/discount-stock", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ProductsController.discountStock(data);
    res.status(response.status).json({
      status: response.status,
      message: response.message,
      error: response.error,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/produce",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body.listProducts;
      const response = await ProductsController.increaseStockProduct(data);
      res.status(response.status).json({
        status: response.status,
        message: response.message,
        error: response.error,
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
