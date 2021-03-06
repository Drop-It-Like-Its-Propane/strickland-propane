const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type:Sequelize.INTEGER,
    allowNull: false

  },
  orderComplete:{
    type:Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order

