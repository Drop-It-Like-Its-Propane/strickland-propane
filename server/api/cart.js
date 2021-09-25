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
      include: {
        model: OrderDetails,
        required: true,
        include: {
          model: Product,
        },
      },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

//Add an item to cart - Post Route
//this code is ugly...but it works for now
router.post("/:id", async (req, res, next) => {
  let currentUser = req.params.id;
  try {
    let newOrder = {};
    await Orders.create({
      userId: currentUser,
    }).then((result) => (newOrder.id = result.id));
    res.send(
      await OrderDetails.create({
        orderId: newOrder.id,
        productId: req.body.id,
        totalPrice: req.body.price,
      })
    );
  } catch (error) {
    next(error);
  }
});

// Adjust number of item in cart

//Get Order History (Complete Orders)

//Incrementing Cart
/* This route needs to be updated once we develop a form that sends OrderId, ProductId, and Quantity
in the request body.  */
router.put("/:orderId/:productId/:quantity", async (req, res, next) => {
  try {
    let updated = await OrderDetails.update(
      {quantity: req.params.quantity},
      {where: {orderId: req.params.orderId, productId: req.params.productId},
       returning: true})
       console.log(updated[1][0].dataValues)
      res.send(updated[1][0].dataValues)
  } catch (error) {
    next(error)
  }
})


//Checkout Cart

//Remove Item from Cart


module.exports = router;
