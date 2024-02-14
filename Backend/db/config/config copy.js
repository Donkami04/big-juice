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
    host: "aws.connect.psdb.cloud",
    username: "vq7672g9b06xlurph8v8",
    password: "pscale_pw_PRW935X2XR4lOhNoHVGVPtdQUgNlSAwTzL7ZlgYxt2W",
    database: "big-juice-db",
    dialectOptions: {
      dialect: "mysql"
    },
  },
};

// "mysql://vq7672g9b06xlurph8v8:pscale_pw_PRW935X2XR4lOhNoHVGVPtdQUgNlSAwTzL7ZlgYxt2W@aws.connect.psdb.cloud/big-juice-db?ssl={"rejectUnauthorized":false}"

module.exports = { dbConfig };
