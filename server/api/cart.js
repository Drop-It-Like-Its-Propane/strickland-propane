const router = require("express").Router();
const {
  models: { Order, OrderDetail, Product },
} = require("../db");

//Get 'Cart' (Open Order)
router.get("/:id", async (req, res, next) => {
  let currentUser = req.params.id;
  try {
    const orders = await Order.findAll({
      where: { userId: currentUser, orderComplete: false },
      include: {
        model: OrderDetail,
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

//Create User cart if one does not exist,
//adds first item - Post Route
router.post("/:id/create", async (req, res, next) => {
  let currentUser = req.params.id;
  try {
      let newOrder = await Order.create({
      userId: currentUser})
      res.send(await OrderDetail.create({
        orderId: newOrder.id,
        productId: req.body.id,
        totalPrice: req.body.price,
        })
      )
    } catch(error) {
      next(error)
    }})

//Add an item to cart - Post Route
router.post("/:id", async (req, res, next) => {
  try {
    res.send(await OrderDetail.create({
      orderId: req.body.cartId,
      productId: req.body.id,
      totalPrice: req.body.price,
      })
    );
  } catch (error) {
    next(error);
  }
});

//Get Order History (Complete Orders)

//Incrementing Cart

//Checkout Cart

//Remove Item from Cart

module.exports = router;
