module.exports = app => {
    const cards = require("../controllers/cards.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comment - move comments stuff to auth route
    router.post("/:cardID/:comment", cards.createComment);
  
    // Retrieve all cards
    router.get("/", cards.findAll);
  
    // Retrieve all cards by name
    router.get("/:cardID", cards.findAllBy);
  
    // View all comments
    router.get("/:cardID", cards.viewComments);

    // Update a comment - change route
    //Currently fires off when creating
   // router.put("/:cardID/:comment", cards.update);
  
    // Delete a comment
    router.delete("/:cardID/:comment", cards.delete);
  
    app.use('/api/cards', router);
  };