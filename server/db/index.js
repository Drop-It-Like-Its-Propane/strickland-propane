//this is the access point for all things database related!

const db = require('./db')

const Orders = require('./models/Orders')
const User = require('./models/User')


module.exports = {
  db,
  models: {
    User,
    Orders
  },
}
