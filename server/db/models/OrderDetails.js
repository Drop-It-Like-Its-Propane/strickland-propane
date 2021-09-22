const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderDetails', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, 
        validate: {
            min: 0
        }
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, 
        validate: {
            min: 0
        }
    }
})

module.exports = OrderDetails;