const router = require("express").Router();
const {
  models: { Order, OrderDetail, Product },
} = require("../db");
const { requireToken, isAdmin, verifyUser } = require("./gatekeeper");

// thoughts for the future - "loaded models, mini routes"

//Get 'Cart' (Open Order)

router.get("/:id", requireToken,verifyUser, async (req, res, next) => {
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
router.post("/:id/create", verifyUser, async (req, res, next) => {
  let currentUser = req.params.id;
  try {
    let newOrder = await Order.create({
      userId: currentUser,
    });

      let newOrderDetails = await OrderDetail.create({
        orderId: newOrder.id,
        productId: req.body.id,
        totalPrice: req.body.price,
      })
      res.send({newOrder, newOrderDetails})
    ;
  } catch (error) {
    next(error);
  }
});

// Adding an item to an existing cart
router.post("/:id", verifyUser, async (req, res, next) => {
  try {
    res.send(
      await OrderDetail.create({
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
/* This route needs to be updated once we develop a form that sends OrderId, ProductId, and Quantity
in the request body.  */
router.put("/:orderId/:productId/:quantity", verifyUser, async (req, res, next) => {
  try {
    let updated = await OrderDetail.update(
      { quantity: req.params.quantity },
      {
        where: { orderId: req.params.orderId, productId: req.params.productId },
        returning: true,
      }
    );
    console.log(updated[1][0].dataValues);
    res.send(updated[1][0].dataValues);
  } catch (error) {
    next(error);
  }
});

//Checkout Cart
router.put("/:id/checkout", verifyUser, async (req, res, next) => {
  try {
    res.send( await Order.update({
      orderComplete: true}, {
      where: { userId: req.params.id },
    }))
  } catch (error) {
    next(error);
  }
});

//Remove Item from Cart
// localhost8080/api/cart/101/52/12
// update to be more semantic - more slashes!
router.delete("/:id/:orderId/:productId", verifyUser, async (req, res, next) => {
  try {
    res.send(
      await OrderDetail.destroy({
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId,
        },
      })
    );
  } catch (error) {
    next(error);
  }
});


module.exports = router;
