const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderDetails', {
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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

const currencyAdjust = (details) => {
    details.totalPrice = Math.floor(details.totalPrice * 100)
  };

  OrderDetails.beforeCreate(currencyAdjust);
  OrderDetails.beforeBulkCreate((detail) => detail.map(currencyAdjust));

module.exports = OrderDetails;
