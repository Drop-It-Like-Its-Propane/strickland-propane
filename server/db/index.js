//this is the access point for all things database related!

const db = require('./db')

const OrderDetails = require('./models/OrderDetails')
const Orders = require('./models/Orders')
const Product = require('./models/Product')

const User = require('./models/User')


Orders.belongsTo(User);
User.hasMany(Orders);
Orders.hasMany(OrderDetails);
OrderDetails.belongsTo(Orders);
Product.hasMany(OrderDetails);
OrderDetails.belongsTo(Product);

module.exports = {
  db,
  models: {
    User, OrderDetails, Product, Orders
  },
}
