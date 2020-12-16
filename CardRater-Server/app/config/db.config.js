module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "", //change to your local version
    DB: "cs366project",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
