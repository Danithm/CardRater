module.exports = (sequelize, Sequelize) => {
    const Cards = sequelize.define("cards", {
      cardID: {
        type: Sequelize.STRING
      },
      cardName: {
        type: Sequelize.STRING
      },
      cardText: {
        type: Sequelize.STRING
      }
      //Add more depending on final schema
      //Also need to check for support for card art - see below for possible implementation
      //BLOB is large data type for sequelize, need to check their docs: https://sequelize.org/master/
      /*
      artwork: {
          type. Sequelize.BLOB("long")
      }
      */
      //Or just call it from external API
      //Need to check specialized associations(one to many) for comments
    });
  
    return Cards;
  };