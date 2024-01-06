const express = require("express");
const router = express.Router();
const { zeroSaleEmail, zeroSaleEmail2 } = require("../controllers/email");

router.post("/zero-sale", async (req, res, next) => {
  try {
    const aaa = zeroSaleEmail2();
    console.log(`por aqui ${aaa}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
