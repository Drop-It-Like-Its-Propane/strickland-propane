const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  orderId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  userId: {
    type:Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Orders

