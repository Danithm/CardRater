const db = require("../models");  
const Comment = db.comments;

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  //For running with auth header
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
