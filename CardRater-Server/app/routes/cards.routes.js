module.exports = app => {
    const cards = require("../controllers/cards.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/cards/:cardName/:comment", cards.createComment);
  
    // Retrieve all cards
    router.get("/cards", cards.findAll);
  
    // Retrieve all cards by attribute - placeholder route
    router.get("/cards/:attribute", cards.findAllBy);
  
    // View all comments
    router.get("/cards/:cardName/comments", cards.viewComments);

    // Update a comment with session key
    router.put("/cards/:cardName/comments/:sessionKey", cards.update);
  
    // Delete a comment with session key
    router.delete("/cards/:cardName/comments/:sessionKey", cards.delete);
  
    app.use('/api/cards', router);
  };