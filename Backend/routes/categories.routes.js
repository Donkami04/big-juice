const express = require("express");
const router = express.Router();
const { CategoriesController } = require("../controllers/categories.controller");

router.get("/", async (req, res, next) => {
  try {
    const categories = await CategoriesController.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const data = req.body;
    const newCategory = await CategoriesController.createCategory(data);
    res.status(newCategory.status).json({
      status: newCategory.status,
      message: newCategory.message,
      error: newCategory.error,
      data: newCategory.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const categorieEdit = await CategoriesController.editOneCategory(id, changes);
    res.status(categorieEdit.status).json({
      status: categorieEdit.status,
      message: categorieEdit.message,
      error: categorieEdit.error,
      data: categorieEdit.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/remove/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const categorieDeleted = await CategoriesController.deleteCategory(id);
    res.status(categorieDeleted.status).json({
      status: categorieDeleted.status,
      message: categorieDeleted.message,
      error: categorieDeleted.error,
      data: categorieDeleted.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
