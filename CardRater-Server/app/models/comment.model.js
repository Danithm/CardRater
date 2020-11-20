module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      username: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.INTEGER
      },
      cardID: {
        type: Sequelize.STRING
      },
    });
    return Comment;
  };