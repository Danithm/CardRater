module.exports = (sequelize, Sequelize) => {
    const Cards = sequelize.define("cards", {
      cardID: {
        type: Sequelize.STRING
      },
      cardName: {
        type: Sequelize.STRING
      },
      cardText: {
        type: Sequelize.TEXT
      },
      multiverseId: {
        type: Sequelize.STRING
      },
      cardColor: {
        type: Sequelize.STRING
      },
      cardSetCode: {
        type: Sequelize.STRING
      },
      cardType: {
        type: Sequelize.STRING
      }
      
    },{timestamps: false  
    });
  
    return Cards;
  };