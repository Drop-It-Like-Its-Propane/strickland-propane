const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

//GET Single Products
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
