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

//Add an item to cart - Post Route
router.post("/:id", async (req, res, next) => {
  //Maybe
  let currentUser = req.params.id
  try {
    let newOrder=  await Orders.create({
        userId: currentUser
      })
     res.send (await OrderDetails.create({
          orderId: newOrder.orderId,
          productId: req.body.data.productId,
          totalPrice: req.body.data.price
      })
     )
  } catch (error) {
    next(error);
  }
});

//Get Order History (Complete Orders)

//Incrementing Cart

//Checkout Cart

//Remove Item from Cart

module.exports = router;
