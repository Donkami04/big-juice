const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { validateData } = require("../middlewares/validator.handler");
const { createProductSchema } = require("../db/schemas/products.schema");
const {
  ProductionController,
} = require("../controllers/production.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { initialDate, finalDate, ubication } = req.body;
      const products = await ProductionController.getProduction(
        initialDate,
        finalDate,
        ubication
      );
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  // validateData(createProductSchema),
  async (req, res, next) => {
    try {
      const user = req.user;
      const data = req.body;
      console.log(data)
      const newProduction = await ProductionController.createProduction(data, user);
      res.status(newProduction.status).json({
        status: newProduction.status,
        message: newProduction.message,
        error: newProduction.error,
        data: newProduction.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// router.delete(
//   "/remove/:id",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin"),
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const productDeleted = await ProductsController.deleteProduct(id);
//       res.status(productDeleted.status).json({
//         status: productDeleted.status,
//         message: productDeleted.message,
//         error: productDeleted.error,
//         data: productDeleted.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

// router.post("/discount-stock", async (req, res, next) => {
//   try {
//     const data = req.body;
//     const response = await ProductsController.discountStock(data);
//     res.status(response.status).json({
//       status: response.status,
//       message: response.message,
//       error: response.error,
//       data: response.data,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.post(
//   "/produce",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res, next) => {
//     try {
//       const data = req.body.listProducts;
//       const response = await ProductsController.increaseStockProduct(data);
//       res.status(response.status).json({
//         status: response.status,
//         message: response.message,
//         error: response.error,
//         data: response.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

module.exports = router;
