const Sequelize = require("sequelize");
const { validate } = require("../db");
const db = require("../db");

const Product = db.define("products", {
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
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg",
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue:0,
    validate: {
      min: 0,
    },
  },
});

const currencyAdjust = (product) => {
  product.price = Math.floor(product.price * 100);
};

Product.beforeCreate(currencyAdjust);
Product.beforeBulkCreate((product) => product.map(currencyAdjust));

module.exports = Product;
