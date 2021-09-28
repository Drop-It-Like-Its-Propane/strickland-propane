//this is the access point for all things database related!

const db = require("./db");

const OrderDetail = require("./models/OrderDetail");
const Order = require("./models/Order");
const Product = require("./models/Product");
const User = require("./models/User");

Order.belongsTo(User);
User.hasMany(Order);
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);
Product.hasMany(OrderDetail);
OrderDetail.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    OrderDetail,
    Product,
    Order,
  },
};
