const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

// TODO - create a Menu model
let Menu = sequelize.define("Menu", {
  title: DataTypes.STRING,
});

module.exports = { Menu };
