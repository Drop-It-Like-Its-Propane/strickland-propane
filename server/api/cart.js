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
router.post("/", async (req, res, next) => {
  //Maybe
  let currentUser = req.body.data.userId
  try {
    let newOrder=  await Orders.create({
        userId: currentUser
      })
     res.send (await Promise.all(req.body.data.order. map((product) =>  {
         OrderDetails.create({
          orderId: newOrder.orderId,
          productId: product.id,
          totalPrice: product.price,
          quantity: product.quantity,
      })
    })
     ))
  } catch (error) {
    next(error);
  }
});

//Get Order History (Complete Orders)

//Incrementing Cart

//Checkout Cart

//Remove Item from Cart

module.exports = router;
