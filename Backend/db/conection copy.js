const Sequelize = require('sequelize');
const dbConfig = require("../db/config/config")
require('dotenv').config();

const env = process.env.NODE_ENV || 'local';
const config = dbConfig.dbConfig[env];
console.log(config.dialect)
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;
