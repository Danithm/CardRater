const db = require("../models");
const Cards = db.cards;
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new comment
exports.createComment = (req, res) => {
    console.info(req.params)
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

//Pagination functions
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: cards } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, cards, totalPages, currentPage };
};

// Retrieve all cards from the database.
exports.findAll = (req, res) => {
  const { page, size} = req.query;
    const cardName = req.query.cardName;
    var condition = cardName ? { cardName: { [Op.like]: `%${cardName}%` } } : null;
    const { limit, offset } = getPagination(page, size);

    Cards.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all cards."
        });
      });
};

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

// Update a comment with a current user check
exports.update = (req, res) => {
    const commentID = req.params.commentID;
    const username = req.body.username;
    const text = req.body.text;
    const rating = req.body.rating;

    console.info(req.body);

    Comment.update({   
        username: username,
        text: text,
        rating: rating,
      },  
      {where: { id: commentID }
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

// Delete a comment
exports.delete = (req, res) => {
    const commentID = req.params.commentID;

    Comment.destroy({
      where: { 
        id: commentID
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id
      });
    });
};
