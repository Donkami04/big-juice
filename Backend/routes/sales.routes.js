const express = require("express");
const router = express.Router();
const { SalesController } = require("../controllers/sales.controller");

router.get("/", async (req, res, next) => {
  try {
    const sales = await SalesController.getSales();
    res.json(sales);
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await SalesController.newSale(data);
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

router.get("/total", async (req, res, next) => {
  try {
    const { initialDate, finalDate, ubication } = req.body;
    const sales = await SalesController.totalSales(initialDate, finalDate, ubication);
    res.status(sales.status).json({
      status: sales.status,
      message: sales.message,
      error: sales.error,
      data: sales.data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/category", async (req, res, next) => {
  try {
    const { initialDate, finalDate, category, ubication } = req.body;
    const sales = await SalesController.totalSalesCategory(initialDate, finalDate, category, ubication);
    res.status(sales.status).json({
      status: sales.status,
      message: sales.message,
      error: sales.error,
      data: sales.data,
    });
  } catch (error) {
    next(error);
  }
});


router.delete("/remove/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const saleDeleted = await SalesController.deleteSale(id);
    res.status(saleDeleted.status).json({
      status: saleDeleted.status,
      message: saleDeleted.message,
      error: saleDeleted.error,
      data: saleDeleted.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
