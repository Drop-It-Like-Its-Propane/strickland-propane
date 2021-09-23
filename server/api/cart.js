const router = require("express").Router();
const {
  models: { Orders, OrderDetails, Product },
} = require("../db");

//Get 'Cart' (Open Order)
router.get("/:id", async (req, res, next) => {
  let currentUser = req.params.id;
  try {
    const orders = await Orders.findAll({
      where: { userId: currentUser, orderComplete: false },
      include: { model: OrderDetails, required: true, include: {
          model: Product
      } }
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// models.products.findAll({
//     include: [
//       {model: models.comments, include: [models.comments.users] }
//     ]
//   })
//Add an item - Post Route

//Get Order History (Complete Orders)

//Incrementing Cart

//Checkout Cart

//Remove Item from Cart

module.exports = router;
