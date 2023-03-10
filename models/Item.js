const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

// TODO - create an Item model
let Item = sequelize.define("Item", {
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.NUMBER,
  vegetarian: DataTypes.BOOLEAN,
});

module.exports = { Item };
