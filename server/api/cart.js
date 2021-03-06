const router = require("express").Router();
const {
  models: { Order, OrderDetail, Product },
} = require("../db");
const { requireToken, verifyUser } = require("./gatekeeper");

// thoughts for the future - "loaded models, mini routes"

//Get 'Cart' (Open Order)

router.get(
  "/:id",
  /*requireToken, verifyUser,*/ async (req, res, next) => {
    let currentUser = req.params.id;
    try {
      const orders = await Order.findAll({
        attributes: ["id", "orderComplete", "userId"],
        where: { userId: currentUser, orderComplete: false },
        include: {
          model: OrderDetail,
          attributes: ["id", "orderId", "productId", "quantity", "totalPrice"],
          include: {
            model: Product,
            attributes: [
              "description",
              "id",
              "imageUrl",
              "name",
              "price",
              "quantity",
            ],
          },
        },
      });
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

//Create User cart if one does not exist,
//adds first item - Post Route
router.post("/:id/create", requireToken, verifyUser, async (req, res, next) => {
  let currentUser = req.params.id;
  try {
    let newOrder = await Order.create({
      userId: currentUser,
    });
    let newOrderDetails = await OrderDetail.create({
      orderId: newOrder.id,
      productId: req.body.id,
      totalPrice: req.body.price,
    });
    res.send({ newOrder, newOrderDetails });
  } catch (error) {
    next(error);
  }
});

// Adjust number of item in cart
// Adding an item to an existing cart
router.post("/:id", requireToken, verifyUser, async (req, res, next) => {
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
router.put("/:id/edit", requireToken, verifyUser, async (req, res, next) => {
  try {
    let updatedField = await OrderDetail.update(
      { quantity: req.body.quantity },
      {
        where: { orderId: req.body.orderId, productId: req.body.productId },
        returning: true,
      }
    );
    //product: {...product.dataValues}
    let product = await Product.findByPk(req.body.productId);
    let Object1 = updatedField[0];
    let object2 = { product };
    //build response object before sending
    res.send({ Object1, object2 });
  } catch (error) {
    next(error);
  }
});

//Checkout Cart
router.put(
  "/:id/checkout",
  requireToken,
  verifyUser,
  async (req, res, next) => {
    try {
      res.send(
        await Order.update(
          {
            orderComplete: true,
          },
          {
            where: { userId: req.params.id },
          }
        )
      );
    } catch (error) {
      next(error);
    }
  }
);

//Remove Item from Cart
router.delete(
  "/:id/delete",
  // requireToken,
  // verifyUser,
  async (req, res, next) => {
    try {
      const removeItem = await OrderDetail.findByPk(req.body.id);
      await removeItem.destroy();
      res.send(removeItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
