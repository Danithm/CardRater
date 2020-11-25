const db = require("../models");
const Cards = db.cards;
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new comment
//card -> comments
//Add access check
exports.createComment = (req, res) => {
    Comment.create({
      username: req.body.username,
      text: req.body.text,
      rating: req.body.rating,
      cardID: req.body.cardID,
    })
      .then(data => {
        console.log(">> Created comment: " + JSON.stringify(data, null, 4));
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the comment."
        });
        console.log(">> Error while creating comment: ", err);
      });
  };

// Retrieve all cards from the database.
exports.findAll = (req, res) => {
    const cardName = req.query.cardName;
    var condition = cardName ? { cardName: { [Op.like]: `%${cardName}%` } } : null;

    Cards.findAll({ where: condition })
      .then(data => {
        res.send(data);//Changed from reponse to only send unpaged data
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all cards."
        });
      });
};

//Find all cards by name - modify later to switch attribute
//Likely don't need paging for this one
//It finds the card for the single page
exports.findAllBy = (req, res) => {
    const cardID = req.params.cardID;

    //Need to modify this to switch type 
    Cards.findAll({ where: {cardID: cardID}})
      .then(data => {
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
    const cardID = req.params.cardID;

    //Might need to check sequelize syntax for one to many relationship
    Comment.findAll({ where: { cardID: cardID}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
}
// Update a comment with a session key - move to auth controller
exports.update = (req, res) => {

    const cardID = req.params.cardID;
    const user = req.params.username;

    Comment.update(req.body, {
      where: { 
          cardID: cardID,
          username: user
        }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update card comment as user=${user}. Maybe the comment was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating comment" 
        });
      });
};

// Delete a comment with a session key
//Check for commentID or just match cardID
//Since delete should only be visble on card page
exports.delete = (req, res) => {
    const user = req.params.username;

    Comment.destroy({
      where: { username: user }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete comment as user=${user}. Maybe comment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete comment"
        });
      });
};
