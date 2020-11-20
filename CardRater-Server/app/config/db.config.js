module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "MyL0ng@$$$3cur3", //change to your local version
    DB: "cs366project",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  //Check: https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
  //If we need additional options
  //Like schema/query configs