const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  userId: {
    type:Sequelize.INTEGER,
    allowNull: false

  },
  orderComplete:{
    type:Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Orders

