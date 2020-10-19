module.exports = app => {
    const cards = require("../controllers/cards.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/:cardName/:comment", cards.createComment);
  
    // Retrieve all cards
    router.get("/", cards.findAll);
  
    // Retrieve all cards by attribute
    router.get("/:attribute", cards.findAllBy);
  
    // View all comments
    router.get("/:cardName/comments", cards.viewComments);

    // Update a comment with session key
    router.put("/:cardName/comments/:sessionKey", cards.update);
  
    // Delete a comment with session key
    router.delete("/:cardName/comments/:sessionKey", cards.delete);
  
    app.use('/api/cards', router);
  };