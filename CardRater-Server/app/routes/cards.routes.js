module.exports = app => {
    const cards = require("../controllers/cards.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comment - move comments stuff to auth route
    router.post("/cards/:cardID/:comment", cards.createComment);
  
    // Retrieve all cards
    router.get("/cards", cards.findAll);
  
    // Retrieve all cards by name
    router.get("/cards/:cardName", cards.findAllBy);
  
    // View all comments
    router.get("/cards/:cardID", cards.viewComments);

    // Update a comment
    router.put("/cards/:cardID/:comment", cards.update);
  
    // Delete a comment
    router.delete("/cards/:cardID/:comment", cards.delete);
  
    app.use('/api/cards', router);
  };