module.exports = app => {
    const cards = require("../controllers/cards.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/:cardID", cards.createComment);
  
    // Retrieve all cards
    router.get("/", cards.findAll);
  
    // Retrieve a single card by ID
    router.get("/:cardID", cards.findAllBy);
  
    // View all comments
    router.get("/:cardID/comments", cards.viewComments);

    // Update a comment
    router.put("/:cardID/comments/:commentID", cards.update);
  
    // Delete a comment
    router.delete("/:cardID/comments/:commentID", cards.delete);
  
    app.use('/api/cards', router);
  };