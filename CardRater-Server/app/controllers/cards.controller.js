const db = require("../models");
const Cards = db.cards;
const Comment = db.comments;
const Op = db.Sequelize.Op;

//Get limit/offset data for pagination
const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: cards } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, cards, totalPages, currentPage };
};  

// Create and Save a new comment
//Need to adjust to make sure it attaches
//as a correct one-to-many relationship
//card -> comment
exports.createComment = (cardID, comment) => {
    return Comment.create({
      name: comment.name,
      text: comment.text,
      rating: comment.rating,
      cardID: cardID,
    })
      .then((comment) => {
        console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
        return comment;
      })
      .catch((err) => {
        console.log(">> Error while creating comment: ", err);
      });
  };

// Retrieve all cards from the database.
exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    const cardName = req.query.cardName;
    var condition = cardName ? { cardName: { [Op.like]: `%${cardName}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);

    Cards.findAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all cards."
        });
      });
};

//Find all cards by attribute
exports.findAllBy = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const attribute = req.params.attribute;

    //Need to modify this to switch type 
    Cards.findAll({ where: {/*param attribute = card attribute*/}, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cards."
        });
      });
};

//View all comments of a card
exports.viewComments = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const cardID = req.params.cardID;

    //Might need to check sequelize syntax for one to many relationship
    Cards.findAll({ where: { cardID: cardID, include: ["comments"] }, limit, offset})
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
}
// Update a comment with a session key
//TODO: Add session key package
exports.update = (req, res) => {

    const cardID = req.params.cardID;
    const sessionKey = req.params.sessionKey;

    Cards.update(req.body, {
      where: { 
          cardID: cardID,
          sessionKey: sessionKey
        }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update card comment with sessionKey=${sessionKey}. Maybe the comment was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating comment with sessionKey=" + sessionKey
        });
      });
};

// Delete a comment with a session key
exports.delete = (req, res) => {
    const sessionKey = req.params.sessionKey;

    Cards.destroy({
      where: { sessionKey: sessionKey }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete comment with sessionKey=${sessionKey}. Maybe comment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete comment with sessionKey=" + sessionKey
        });
      });
};
