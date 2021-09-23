const router = require("express").Router();
const { Product } = require('../db')

//GET Single Products
router.get('/:id'), async (req, res, next) => {
  try {
    const product = await Product.findByPK(req.params.id)
    //need to implement handling of unfound items
    res.send(product)
  }
  catch (error) {
    next(error)
  }
}

module.exports = router
