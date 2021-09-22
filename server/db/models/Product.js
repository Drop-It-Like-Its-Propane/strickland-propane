const Sequelize = require("sequelize");
const { validate } = require("../db");
const db = require("../db");

const Product = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg",
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});

Product.beforeCreate = (product, options) => {
  product.price = product.price * 100;
};

module.exports = Product;
