const { Sequelize } = require("sequelize");
const dotenv = require('dotenv/config');

module.exports = new Sequelize(
  process.env.DB_NAME, //Название ДБ
  process.env.DB_USER, // USER
  process.env.DB_PASSWORD, //Password

  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
