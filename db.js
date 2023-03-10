const path = require("path");
const { Sequelize, Model } = require("sequelize");

// TODO - connect to db via sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.seqlite"),
  logging: false,
});

module.exports = {
  sequelize,
  Sequelize,
};
