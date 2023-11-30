const express = require("express");
const router = express.Router();
const { IngredientsController } = require("../controllers/ingredients.controller");

router.get("/", async (req, res, next) => {
  try {
    const ingredients = await IngredientsController.getIngredients();
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const ingredientEdit = await IngredientsController.editOneIngredient(id, changes);
    res.status(ingredientEdit.status).json({
      status: ingredientEdit.status,
      message: ingredientEdit.message,
      error: ingredientEdit.error,
      data: ingredientEdit.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const data = req.body;
    const newIngredient = await IngredientsController.createIngredient(data);
    res.status(newIngredient.status).json({
      status: newIngredient.status,
      message: newIngredient.message,
      error: newIngredient.error,
      data: newIngredient.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/remove/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const ingredientDeleted = await IngredientsController.deleteIngredient(id);
    res.status(ingredientDeleted.status).json({
      status: ingredientDeleted.status,
      message: ingredientDeleted.message,
      error: ingredientDeleted.error,
      data: ingredientDeleted.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.post("/discount-stock", async (req, res, next) => {
//   try {
//     const data = req.body;
//     const response = await IngredientsController.discountStock(data);
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

// router.post("/produce", async (req, res, next) => {
//   try {
//     const data = req.body;
//     const response = await IngredientsController.increaseStockIngredient(data);
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





module.exports = router;
