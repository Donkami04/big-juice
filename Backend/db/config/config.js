const dbConfig = {
  local: {
    dialect: "mysql",
    host: "127.0.0.1",
    username: "bjadmin",
    password: "280429",
    database: "bigjuice",
    port: 33061,
  },
  production: {
    dialect: "mysql",
    host: "db",
    username: "bjadmin",
    password: "280429",
    database: "bigjuice",
    port: 33061,
  },
};

module.exports = { dbConfig };
