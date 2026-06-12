const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME || "foodies",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

module.exports = db;