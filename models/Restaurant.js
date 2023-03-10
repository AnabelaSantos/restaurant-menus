const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

// TODO - create a Restaurant model

let Restaurant = sequelize.define("Restaurant", {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  cuisine: DataTypes.STRING,
});

module.exports = { Restaurant };
